import { Injectable } from '@nestjs/common';
import { Express } from 'express';
import * as cloudinary from 'cloudinary';

@Injectable()
export class CloudinaryService {
  async uploadVideo(file: Express.Multer.File): Promise<string> {
    if (!file) {
      throw new Error('No file received in Cloudinary service');
    }

    console.log('Received file for upload:', file); // Log the received file

    // Log the file path to verify that the file is correctly stored
    console.log('File path for upload:', file.path); // <-- Add this line

    return new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload(
        file.path, // Path to the file uploaded via Multer
        { resource_type: 'video' },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error); // Log if there's an error
            reject(error);
          } else {
            console.log('Cloudinary upload result:', result); // Log the result from Cloudinary
            if (result && result.secure_url) {
              resolve(result.secure_url); // Return the Cloudinary URL
            } else {
              reject(new Error('Cloudinary did not return a valid result.'));
            }
          }
        },
      );
    });
  }
}
