import {
  IsString,
  IsOptional,
  IsUUID,
  IsArray,
  Matches,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '../../dto/base-content.dto';

export class CreateSeasonDto extends BaseDto {
  @ApiProperty({
    description: 'Season number if the content is part of a series',
    example: 1,
  })
  @IsNumber()
  season: number;

  @ApiProperty({
    description: 'ID of the series the season belongs to',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  series_id: string;

  @ApiProperty({
    description: 'Release date of the season',
    required: false,
    example: '2025-01-01',
  })
  @IsOptional()
  @Matches(/^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/i, {
    message: '$property must be formatted as yyyy-mm-dd',
  })
  release_date?: Date;

  @ApiProperty({
    description: 'List of episode IDs for the season',
    required: false,
  })
  @IsOptional()
  @IsArray()
  episodes?: string[];

  @ApiProperty({
    description: 'Preview image URL',
    example: 'inception.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  preview_image?: string;
}
