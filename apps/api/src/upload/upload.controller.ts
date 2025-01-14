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
  @UseInterceptors(FileInterceptor('file')) // This should match the form field name
  async uploadVideo(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('No file uploaded');
    }

    console.log(file); // Add logging to check the file structure

    const videoUrl = await this.cloudinaryService.uploadVideo(file);
    return { videoUrl }; // Return the Cloudinary URL
  }
}
