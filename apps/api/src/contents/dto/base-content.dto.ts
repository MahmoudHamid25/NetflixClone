import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseDto {
  @ApiProperty({
    description: 'Title of the entity',
    example: 'The Beginning',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Description of the entity',
    example: 'This is a detailed description.',
  })
  @IsString()
  description: string;
}