import {
  Injectable,
  Logger,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    meta: string,
    email: string,
  ): Promise<string[]> {
    try {
      // console.log('uploadPromises files: ', files);

      // const displayOrders: Array<{ displayOrder: number }> = JSON.parse(meta); // ## TO DO
      // console.log('uploadPromises meta: ', displayOrders);

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
      // console.log("unploadSingleImages: ", file)
      const timestamp = new Date().toISOString().split('T')[0];
      const uniqueId = uuidv4();
      const fileExtention = file.mimetype.split('/')[1];
      const fileName = `buoys/${timestamp}/${uniqueId}.${fileExtention}`;

      // console.log("buffer: ", file.buffer)
      // console.log("fileName: ", fileName)

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

      // await this.s3Client.send(command)
      this.logger.log(`Successfully uploaded: ${fileName}`);

      const userImage = this.userImageRepository.create({
        user: { id: this.userId },
        imageUrl: `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${fileName}`,
        displayOrder: order,
        mimeType: file.mimetype,
      });

      await this.userImageRepository.save(userImage);

      console.log('unploadSingleImages userImage:', userImage);

      return `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${fileName}`;
    } catch (error: unknown) {
      handleError(error);
    }
  }

  async deleteImage(id: string): Promise<string> {
    try {
      const removedImage = await this.userImageRepository.delete(id)
      console.log("deleteImage: ", removedImage)
      return 'Successfully'
    } catch (error: unknown) {
      handleError(error)
    }
  }
}
