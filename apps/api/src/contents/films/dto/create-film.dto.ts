import { IsString, IsDate, IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFilmDto {
  @ApiProperty({ description: 'Title of the film', example: 'Inception' })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Description of the film',
    example: 'A mind-bending thriller',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Preview image URL',
    example: 'inception.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  preview_image?: string;

  @ApiProperty({
    description: 'Release date of the film',
    example: '2010-07-16',
    required: false,
  })
  @IsDate()
  @IsOptional()
  release_date?: Date;

  @ApiProperty({
    description: 'Subtitles available for the film',
    example: { en: 'English', es: 'Spanish' },
    required: false,
  })
  @IsOptional()
  subs?: object;

  @ApiProperty({
    description: 'Dubs available for the film',
    example: { en: 'English', fr: 'French' },
    required: false,
  })
  @IsOptional()
  dubs?: object;

  @ApiProperty({
    description: 'Available qualities of the film',
    example: ['HD', '4K'],
    required: false,
  })
  @IsArray()
  @IsOptional()
  available_qualities?: string[];

  @ApiProperty({
    description: 'Credits information for the film',
    example: 'Christopher Nolan',
    required: false,
  })
  @IsString()
  @IsOptional()
  credits?: string;

  @ApiProperty({
    description: 'The URL of the video hosted on Cloudinary or similar service',
    example: 'https://res.cloudinary.com/your-cloud-name/video/upload/v1616600992/your-video-path.mp4',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  videoUrl: string;
}
