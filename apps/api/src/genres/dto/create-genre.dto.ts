import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGenreDto {
  @ApiProperty({
    description: 'The name of the genre',
    example: 'Action',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'A brief description of the genre',
    example: 'Fast-paced, exciting films with intense action scenes.',
  })
  @IsString()
  description: string;
}
