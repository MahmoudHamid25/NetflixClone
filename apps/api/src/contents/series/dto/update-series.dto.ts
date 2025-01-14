import { PartialType } from '@nestjs/mapped-types';
import { CreateSeriesDto } from './create-series.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSeriesDto extends PartialType(CreateSeriesDto) {
  @ApiPropertyOptional({
    description: 'Title of the series',
    example: 'The Great Adventure (Updated)',
  })
  title?: string;

  @ApiPropertyOptional({
    description: 'Description of the series',
    example: 'Updated series description.',
  })
  description?: string;

  @ApiPropertyOptional({
    description: 'Release date of the series',
    required: false,
    example: '2025-03-01',
  })
  release_date?: Date;
}
