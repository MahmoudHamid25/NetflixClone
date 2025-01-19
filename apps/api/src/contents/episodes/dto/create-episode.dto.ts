import {
  IsString,
  IsOptional,
  IsInt,
  IsUUID,
  IsArray,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '../../dto/base-content.dto';

export class CreateEpisodeDto extends BaseDto {
  @ApiProperty({
    description: 'ID of the season the episode belongs to',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  season_id: string;

  @ApiProperty({ description: 'Episode number within the season', example: 1 })
  @IsInt()
  episode_number: number;

  @ApiProperty({
    description: 'Preview image URL for the episode',
    required: false,
    example: 'episode-1.jpg',
  })
  @IsOptional()
  @IsString()
  preview_image?: string;

  @ApiProperty({
    description: 'Release date of the episode',
    required: false,
    example: '2025-01-15',
  })
  @IsOptional()
  @Matches(/^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/i, {
    message: '$property must be formatted as yyyy-mm-dd',
  })
  release_date?: Date;

  @ApiProperty({
    description: 'Available qualities for the episode',
    required: false,
    example: ['HD', '4K'],
  })
  @IsOptional()
  @IsArray()
  available_qualities?: string[];

  @ApiProperty({
    description: 'The URL of the video hosted on Cloudinary or similar service',
    example:
      'https://res.cloudinary.com/your-cloud-name/video/upload/v1616600992/your-video-path.mp4',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  videoUrl: string;
}
