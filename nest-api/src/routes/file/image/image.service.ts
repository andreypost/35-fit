import {
  BadRequestException,
  Injectable,
  Logger,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import {
  S3Client,
  HeadObjectCommand,
  PutObjectCommand,
  PutObjectCommandInput,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { UserService } from '../../user/user.service';
import { UserImage } from '../../../entities/user.image';
import { handleError } from '../../../utils/handle.error';
import { msg } from '../../../constants/messages';
import { IImageResponse } from './types/interfaces';

@Injectable()
export class ImageService {
  private readonly logger = new Logger(ImageService.name);
  private bucketName: string;
  private region: string;
  private s3Client: S3Client;
  private MAX_IMAGES: number = 5;
  private SHIFT: number = 1_000;

  constructor(
    @InjectRepository(UserImage)
    private userImageRepository: Repository<UserImage>,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly dataSource: DataSource,
  ) {
    this.bucketName = this.configService.get<string>('AWS_BUCKET_NAME');
    this.region = this.configService.get<string>('AWS_REGION');

    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>(
      'AWS_SECRET_ACCESS_KEY',
    );

    if (!this.bucketName || !this.region || !accessKeyId || !secretAccessKey) {
      this.logger.error('AWS credentials not configured!');
      throw new UnauthorizedException(
        'AWS credentials are required for image upload!',
      );
    }

    this.s3Client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      endpoint: `https://s3.${this.region}.amazonaws.com`,
      forcePathStyle: false,
      useAccelerateEndpoint: false,
    });

    this.logger.log(
      `Initialized S3 client for bucket: ${this.bucketName} in region: ${this.region}`,
    );
  }

  async getAllImages(
    email: string,
    count: boolean = false,
  ): Promise<IImageResponse[] | number> {
    try {
      const currentUser = await this.userService.findUserByEmail(email);
      if (!currentUser) {
        throw new NotFoundException(msg.USER_NOT_FOUND);
      }
      const userId = currentUser.id;

      return count
        ? await this.userImageRepository.count({
            where: { user: { id: userId } },
          })
        : await this.userImageRepository.find({
            where: { user: { id: userId } },
            order: { displayOrder: 'ASC' },
          });
    } catch (error: unknown) {
      handleError(error);
    }
  }

  async uploadImages(
    email: string,
    files: Express.Multer.File[],
  ): Promise<string[]> {
    try {
      const currentUser = await this.userService.findUserByEmail(email);
      if (!currentUser) {
        throw new NotFoundException(msg.USER_NOT_FOUND);
      }
      const userId = currentUser.id;

      const countImages = await this.getAllImages(email, true);

      let baseOrder = Number(countImages);

      if (baseOrder + files.length > this.MAX_IMAGES) {
        throw new NotAcceptableException(`5 ${msg.IMAGES_LIMIT}`);
      }

      return await Promise.all(
        files.map(async (file) => {
          const imageUrl = await this.unploadToS3(file);
          const userImage = this.userImageRepository.create({
            user: { id: userId },
            imageUrl,
            displayOrder: baseOrder++,
            mimeType: file.mimetype,
          });
          await this.userImageRepository.save(userImage);
          return imageUrl;
        }),
      );
    } catch (error: unknown) {
      handleError(error);
    }
  }

  private async unploadToS3(file: Express.Multer.File): Promise<string> {
    try {
      const timestamp = new Date().toISOString().split('T')[0];
      const uniqueId = uuidv4();
      const fileExtention = file.mimetype.split('/')[1];
      const fileName = `buoys/${timestamp}/${uniqueId}.${fileExtention}`;

      this.logger.debug(
        `Uploading file: ${fileName} to bucket: ${this.bucketName}`,
      );

      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
        CacheControl: 'max-age=31536000', // Cache for 1 year
        Metadata: {
          'original-name': file.originalname,
          'upload-date': new Date().toISOString(),
          'file-size': file.size.toString(),
        },
      });

      await this.s3Client.send(command);

      this.logger.log(`Successfully uploaded: ${fileName}`);

      return `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${fileName}`;
    } catch (error: unknown) {
      handleError(error);
    }
  }

  async deleteImage(email: string, imageId: string): Promise<string> {
    try {
      const currentUser = await this.userService.findUserByEmail(email);
      if (!currentUser) {
        throw new NotFoundException(msg.USER_NOT_FOUND);
      }
      const userId = currentUser.id;

      let s3KeyToDelete: string | null = null;

      await this.dataSource.transaction(async (manager) => {
        const result = await manager
          .createQueryBuilder()
          .delete()
          .from(UserImage)
          .where('user_image_id = :id', { id: imageId })
          .returning('*')
          .execute();

        if (!result?.raw?.length)
          throw new NotFoundException(msg.IMAGES_NOT_FOUND);

        const deletedOrder = Number(result.raw[0].display_order);
        const imageUrl: string = result.raw[0].image_url;

        s3KeyToDelete = new URL(imageUrl).pathname.replace(/^\/+/, '');

        await manager.query(
          `
              UPDATE "user_image"
              SET "display_order" = "display_order" + ${this.SHIFT}
              WHERE "user_id" = $1 AND "display_order" > $2
              `,
          [userId, deletedOrder],
        );

        await manager.query(
          `
              UPDATE "user_image"
              SET "display_order" = "display_order" - ${this.SHIFT + 1}
              WHERE "user_id" = $1 AND "display_order" >= $2 + 1 + ${this.SHIFT}
              `,
          [userId, deletedOrder],
        );
      });

      if (s3KeyToDelete) {
        this.logger.debug(
          `Deleting file: ${s3KeyToDelete} from bucket: ${this.bucketName}`,
        );
        try {
          await this.s3Client.send(
            new DeleteObjectCommand({
              Bucket: this.bucketName,
              Key: s3KeyToDelete,
            }),
          );
        } catch (error: unknown) {
          handleError(error);
        }
      }
      return msg.IMAGE_DELETED_SUCCESSFULLY;
    } catch (error: unknown) {
      handleError(error);
    }
  }

  async reorderImages(email: string, order: string[]): Promise<string> {
    try {
      const currentUser = await this.userService.findUserByEmail(email);
      if (!currentUser) {
        throw new NotFoundException(msg.USER_NOT_FOUND);
      }
      const userId = currentUser.id;

      await this.dataSource.transaction(async (manager) => {
        await manager.query('SELECT pg_advisory_xact_lock(hashtext($1))', [
          userId,
        ]);

        const repo = manager.getRepository(UserImage);

        const current = await repo.find({
          where: { user: { id: userId } },
          select: { id: true },
          order: { displayOrder: 'ASC' },
        });

        const currentIds = current.map(({ id }) => id);

        if (order.length !== currentIds.length) {
          throw new BadRequestException(
            'Order must be a permutation of existing image IDs',
          );
        }

        await manager.query(
          `
            UPDATE "user_image"
            SET "display_order" = "display_order" + ${this.SHIFT}
            WHERE "user_id" = $1
          `,
          [userId],
        );

        const params: Record<string, any> = { userId };

        const when = order
          .map((id, idx) => {
            params[`id${idx}`] = id;
            return `WHEN "user_image_id" = :id${idx} THEN ${idx}`;
          })
          .join(' ');

        const inList = order.map((_, idx) => `:id${idx}`).join(',');

        await manager
          .createQueryBuilder()
          .update(UserImage)
          .set({ displayOrder: () => `CASE ${when} ELSE "display_order" END` })
          .where(`"user_id" = :userId AND "user_image_id" IN (${inList})`)
          .setParameters(params)
          .execute();
      });

      return msg.IMAGES_SWIPED_SUCCESSFULLY;
    } catch (error: unknown) {
      handleError(error);
    }
  }
}
