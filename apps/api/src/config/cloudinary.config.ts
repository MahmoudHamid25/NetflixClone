import { Injectable } from '@nestjs/common';
import * as cloudinary from 'cloudinary';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CloudinaryConfigService {
  constructor(private configService: ConfigService) {}

  configure() {
    const cloudName = this.configService.get('CLOUDINARY_CLOUD_NAME');
    const apiKey = this.configService.get('CLOUDINARY_API_KEY');
    const apiSecret = this.configService.get('CLOUDINARY_API_SECRET');

    // Log to verify the credentials are loaded correctly
    console.log('Cloudinary config:', { cloudName, apiKey, apiSecret });

    cloudinary.v2.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });
  }
}
