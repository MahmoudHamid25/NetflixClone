import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';
import { Express } from 'express';

@Controller('upload')
export class UploadController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('video')
  @UseInterceptors(FileInterceptor('file'))
  async uploadVideo(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('No file uploaded');
    }

    const videoUrl = await this.cloudinaryService.uploadVideo(file);
    return { videoUrl };
  }

  @Post('image')
  @UseInterceptors(FileInterceptor('file')) // Match form field name for image uploads
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('No file uploaded');
    }

    console.log(file); // Log the file structure for debugging

    const imageUrl = await this.cloudinaryService.uploadImage(file);
    return { imageUrl }; // Return the Cloudinary URL
  }
}
