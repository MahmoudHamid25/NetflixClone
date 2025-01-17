import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';
import { Express } from 'express';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('video')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload a video file to Cloudinary' })
  @ApiResponse({
    status: 200,
    description: 'The video has been successfully uploaded.',
    schema: {
      type: 'object',
      properties: {
        videoUrl: {
          type: 'string',
          example: 'https://cloudinary.com/video_url',
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'No file uploaded.' })
  async uploadVideo(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('No file uploaded');
    }

    const videoUrl = await this.cloudinaryService.uploadVideo(file);
    return { videoUrl };
  }

  @Post('image')
  @UseInterceptors(FileInterceptor('file')) // Match form field name for image uploads
  @ApiOperation({ summary: 'Upload an image file to Cloudinary' })
  @ApiResponse({
    status: 200,
    description: 'The image has been successfully uploaded.',
    schema: {
      type: 'object',
      properties: {
        imageUrl: {
          type: 'string',
          example: 'https://cloudinary.com/image_url',
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'No file uploaded.' })
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('No file uploaded');
    }

    const imageUrl = await this.cloudinaryService.uploadImage(file);
    return { imageUrl }; // Return the Cloudinary URL
  }
}
