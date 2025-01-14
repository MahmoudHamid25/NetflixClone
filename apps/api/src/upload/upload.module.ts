import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';
import { UploadController } from './upload.controller';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads', // Temporary upload directory (local)
      limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB
    }),
  ],
  controllers: [UploadController],
  providers: [CloudinaryService],
})
export class UploadModule {}
