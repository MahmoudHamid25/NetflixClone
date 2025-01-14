import { PartialType } from '@nestjs/mapped-types';
import { CreateSeasonDto } from './create-season.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSeasonDto extends PartialType(CreateSeasonDto) {
  @ApiPropertyOptional({
    description: 'Title of the season',
    example: 'Season 1 (Updated)',
  })
  title?: string;

  @ApiPropertyOptional({
    description: 'Description of the season',
    example: 'Updated season description.',
  })
  description?: string;

  @ApiPropertyOptional({
    description: 'Release date of the season',
    required: false,
    example: '2025-03-01',
  })
  release_date?: Date;
}
