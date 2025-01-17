import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID, IsBoolean } from 'class-validator';
import { Genre } from '../../genres/entities/genre.entity';

export class UpdatePreferenceDto {
  @IsOptional()
  @IsUUID('4', { each: true })
  @ApiProperty({
    description: 'List of genre IDs to update the preferences with',
    type: [String],
    example: ['3fa85f64-5717-4562-b3fc-2c963f66afa6'],
  })
  genres?: Genre[]; // Array of genre IDs

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: 'Whether the user prefers series',
    example: true,
  })
  seriesPreferred?: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: 'Whether the user prefers films',
    example: false,
  })
  filmsPreferred?: boolean;

  @IsOptional()
  @ApiProperty({ description: 'Minimum age preference', example: 18 })
  minAge?: number;
}
