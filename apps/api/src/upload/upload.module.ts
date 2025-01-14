import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express'; // Required for handling file uploads
import { CloudinaryService } from './cloudinary.service';
import { UploadController } from './upload.controller';
import { ConfigModule } from '@nestjs/config'; // For loading environment variables

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads', // Temporary upload directory (local)
    }),
  ],
  controllers: [UploadController],
  providers: [CloudinaryService],
})
export class UploadModule {}
