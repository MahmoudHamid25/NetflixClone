import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsArray,
  IsOptional,
  IsBoolean,
  IsInt,
} from 'class-validator';

export class CreatePreferenceDto {
  @ApiProperty({
    description: 'The profile ID associated with the preference',
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  @IsString()
  profileId: string;

  @ApiProperty({
    description: 'The minimum age for the preference',
    example: 18,
  })
  @IsInt()
  minAge: number;

  @ApiProperty({
    description: 'Array of genre IDs that the user prefers',
    example: [
      '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      '4fa85f64-5717-4562-b3fc-2c963f66afa6',
    ],
    type: [String],
  })
  @IsArray()
  @IsOptional() // Optional, as the user may not provide genres
  genres?: string[];

  @ApiProperty({
    description: 'If the user prefers series',
    example: true,
  })
  @IsBoolean()
  seriesPreferred: boolean;

  @ApiProperty({
    description: 'If the user prefers films',
    example: false,
  })
  @IsBoolean()
  filmsPreferred: boolean;

  @ApiProperty({
    description: 'Array of viewing classifications (e.g., PG, R)',
    example: ['PG-13', 'R'],
    type: [String],
  })
  @IsArray()
  @IsOptional()
  viewingClassification?: string[];
}
