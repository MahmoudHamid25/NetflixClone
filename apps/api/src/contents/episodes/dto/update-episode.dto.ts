import { PartialType } from '@nestjs/mapped-types';
import { CreateEpisodeDto } from './create-episode.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateEpisodeDto extends PartialType(CreateEpisodeDto) {
  @ApiPropertyOptional({
    description: 'Title of the episode',
    example: 'The Beginning (Updated)',
  })
  title?: string;

  @ApiPropertyOptional({
    description: 'Description of the episode',
    example: 'Updated description.',
  })
  description?: string;

  @ApiPropertyOptional({ description: 'Episode number', example: 2 })
  episode_number?: number;

  @ApiPropertyOptional({
    description: 'Preview image URL',
    required: false,
    example: 'updated-episode.jpg',
  })
  preview_image?: string;

  @ApiPropertyOptional({
    description: 'Release date of the episode',
    required: false,
    example: '2025-02-01',
  })
  release_date?: Date;

  @ApiPropertyOptional({
    description: 'Available qualities for the episode',
    required: false,
    example: ['HD', '8K'],
  })
  available_qualities?: string[];
}
