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
import { ImageUplodDTO } from '../dto/create.user.json.dto';

@Injectable()
export class ImageService {
  private readonly logger = new Logger(ImageService.name);
  private bucketName: string;
  private region: string;
  private s3Client: S3Client;
  private userId: string;

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

  async getAllImages(email: string): Promise<ImageUplodDTO[]> {
    try {
      const currentUser = await this.userService.findUserByEmail(email);
      if (!currentUser) {
        throw new NotFoundException(msg.USER_NOT_FOUND);
      }

      this.userId = currentUser.id;

      return await this.userImageRepository.find({
        where: { user: { id: this.userId } },
        order: { displayOrder: 'ASC' },
      });
    } catch (error: unknown) {
      handleError(error);
    }
  }

  async uploadImages(
    files: Express.Multer.File[],
    email: string,
  ): Promise<string[]> {
    try {

      const allImages = await this.getAllImages(email);

      let order = allImages.length;

      if (order + files.length > 5) {
        throw new NotAcceptableException(`5 ${msg.IMAGES_LIMIT}`);
      }

      console.log('unploadSingleImages order:', order);

      const uploadPromises = files.map((file) =>
        this.unploadSingleImages(file, order++),
      );
      // console.log("uploadPromises: ", uploadPromises)

      return await Promise.all(uploadPromises);
    } catch (error: unknown) {
      handleError(error);
    }
  }

  private async unploadSingleImages(
    file: Express.Multer.File,
    order: number,
  ): Promise<string> {
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

      // await this.s3Client.send(command);

      this.logger.log(`Successfully uploaded: ${fileName}`);

      const userImage = this.userImageRepository.create({
        user: { id: this.userId },
        imageUrl: `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${fileName}`,
        displayOrder: order,
        mimeType: file.mimetype,
      });

      await this.userImageRepository.save(userImage);

      return `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${fileName}`;
    } catch (error: unknown) {
      handleError(error);
    }
  }

  async deleteImage(imageId: string, email: string): Promise<string> {
    try {
      const currentUser = await this.userService.findUserByEmail(email);
      if (!currentUser) {
        throw new NotFoundException(msg.USER_NOT_FOUND);
      }

      this.userId = currentUser.id;

      await this.dataSource.transaction(async (manager) => {
        const userImageRepo = manager.getRepository(UserImage);

        const result = await userImageRepo
          .createQueryBuilder()
          .delete()
          .from(UserImage)
          .where('user_image_id = :id', { id: imageId })
          .returning('*')
          .execute();

        if (result?.raw?.length > 0) {
          const { display_order, image_url } = result.raw[0];

          if (!image_url.includes(this.bucketName)) {
            throw new BadRequestException(msg.INVALID_IMAGE_URL);
          }

          const url = new URL(image_url);
          const key = url.pathname.slice(1);

          const command = new DeleteObjectCommand({
            Bucket: this.bucketName,
            Key: key,
          });

          this.logger.debug(
            `Deleting file: ${key} from bucket: ${this.bucketName}`,
          );

          // await this.s3Client.send(command);

          if (Number.isFinite(display_order)) {
            await manager.query(
              `
              UPDATE "user_image"
              SET "display_order" = "display_order" - 1
              WHERE "user_id" = $1 AND "display_order" > $2
              `,
              [this.userId, display_order],
            );
          }
        }
      });

      return msg.IMAGE_DELETED_SUCCESSFULLY;
    } catch (error: unknown) {
      handleError(error);
    }
  }
}
