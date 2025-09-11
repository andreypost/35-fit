import { BadRequestException, Controller, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { ImageService } from "./image.service";
import { ApiOperation } from "@nestjs/swagger";
import { ImageUplodDTO } from "../dto/create.user.json.dto";


@Controller('file/image')
export class ImageController {
    constructor(
        private readonly imageService: ImageService
    ) { }
    @Post('upload')
    @UseInterceptors(FilesInterceptor('images', 5, {
        limits: {
            fileSize: 5 * 1024 * 1024, // 5MB
            files: 5
        },
        fileFilter: (req, file, callback) => {
            const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
            if (allowedMimeTypes.includes(file.mimetype)) {
                callback(null, true);
            } else {
                callback(new BadRequestException('Only JPG, PNG, and WebP images are allowed'), false);
            }
        },
    }))
    @ApiOperation({ summary: 'upload' })
    async uploadImages(
        @UploadedFiles() images: Express.Multer.File[],
    ) {
        return await this.imageService.uploadImages(images)
    }
}