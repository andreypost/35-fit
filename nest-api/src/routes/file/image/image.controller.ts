import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { ApiOperation } from '@nestjs/swagger';
import { CurrentUserEmail } from '../../../pipes/current.user.email';
import { ImageUplodDTO } from '../dto/create.user.json.dto';

@Controller('file/image')
export class ImageController {
  constructor(private readonly imageService: ImageService) { }

  @Get('all')
  @ApiOperation({ summary: 'all' })
  async getAllImages(
    @CurrentUserEmail() email: string,
  ): Promise<ImageUplodDTO[]> {
    return this.imageService.getAllImages(email);
  }

  @Post('upload')
  @ApiOperation({ summary: 'upload' })
  @UseInterceptors(
    FilesInterceptor('images', 5, {
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
        files: 5,
      },
      fileFilter: (req, file, callback) => {
        const allowedMimeTypes = [
          'image/jpg',
          'image/jpeg',
          'image/png',
          'image/webp',
        ];
        allowedMimeTypes.includes(file.mimetype)
          ? callback(null, true)
          : callback(
            new BadRequestException(
              'Only JPG, JPEG, PNG, and WebP images are allowed!',
            ),
            false,
          );
      },
    }),
  )
  async uploadImages(
    @UploadedFiles() files: Express.Multer.File[],
    @CurrentUserEmail() email: string,
  ) {
    return await this.imageService.uploadImages(files, email);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete' })
  async deleteImage(
    @Param('id') imageId: string,
    @CurrentUserEmail() email: string,
  ): Promise<string> {
    return this.imageService.deleteImage(imageId, email);
  }
}
