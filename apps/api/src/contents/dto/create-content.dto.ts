import {
  IsString,
  IsDate,
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContentDto {
  @ApiProperty({
    description: 'The title of the content (e.g., film title, series name)',
    example: 'The Matrix',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The type of the content, such as film, series, episode',
    example: 'film',
  })
  @IsString()
  type: string;

  @ApiProperty({
    description: 'A detailed description of the content',
    example:
      'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The URL of the preview image for the content',
    example: 'http://example.com/preview.jpg',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  preview_image?: string;

  @ApiProperty({
    description: 'The release date of the content',
    example: '1999-03-31',
    nullable: true,
  })
  @IsOptional()
  @IsDate()
  release_date?: Date;

  @ApiProperty({
    description: 'Subtitles available for the content',
    example: '{"en": "English", "es": "Spanish"}',
    nullable: true,
  })
  @IsOptional()
  @IsObject()
  subs?: object;

  @ApiProperty({
    description: 'Dubbed versions available for the content',
    example: '{"en": "English", "fr": "French"}',
    nullable: true,
  })
  @IsOptional()
  @IsObject()
  dubs?: object;

  @ApiProperty({
    description: 'Available video qualities (e.g., 720p, 1080p)',
    example: ['720p', '1080p'],
    nullable: true,
  })
  @IsOptional()
  @IsArray()
  available_qualities?: string[];

  @ApiProperty({
    description: 'Credits related to the content (e.g., actors, directors)',
    example: 'Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  credits?: string;

  @ApiProperty({
    description:
      'Parent content ID, if this content is part of a series or franchise',
    example: 'abcd-1234-xyz',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  parent_content_id?: string;

  @ApiProperty({
    description: 'Season number if the content is part of a series',
    example: 1,
    nullable: true,
  })
  @IsOptional()
  @IsNumber()
  season?: number;

  @ApiProperty({
    description: 'Episode number if the content is an episode in a series',
    example: 3,
    nullable: true,
  })
  @IsOptional()
  @IsNumber()
  episode_number?: number;

  @ApiProperty({
    description: 'The URL of the video hosted on Cloudinary or similar service',
    example:
      'https://res.cloudinary.com/your-cloud-name/video/upload/v1616600992/your-video-path.mp4',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  videoUrl?: string;
}
