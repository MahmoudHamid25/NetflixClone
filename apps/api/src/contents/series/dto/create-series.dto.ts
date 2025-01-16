import { IsString, IsOptional,  IsArray, Matches } from 'class-validator';
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
  @Matches(/^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/i, {
    message: "$property must be formatted as yyyy-mm-dd"
  })
  release_date?: Date;

  @ApiProperty({
    description: 'The URL of the preview image for the content',
    example: 'http://example.com/preview.jpg',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  preview_image?: string;

  @ApiProperty({
    description: 'List of seasons.tsx associated with the series',
    required: false,
  })
  @IsOptional()
  @IsArray()
  seasons?: string[];
}
