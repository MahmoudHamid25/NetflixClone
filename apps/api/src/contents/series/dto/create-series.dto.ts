import { IsString, IsOptional, IsDate, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSeriesDto {
  @ApiProperty({
    description: 'Title of the series',
    example: 'The Great Adventure',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Description of the series',
    example: 'A thrilling adventure series.',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Release date of the series',
    required: false,
    example: '2025-01-01',
  })
  @IsOptional()
  @IsDate()
  release_date?: Date;

  @ApiProperty({
    description: 'List of available qualities for the series',
    required: false,
    example: ['HD', '4K'],
  })
  @IsOptional()
  @IsArray()
  available_qualities?: string[];

  @ApiProperty({
    description: 'List of seasons associated with the series',
    required: false,
  })
  @IsOptional()
  @IsArray()
  seasons?: string[];
}
