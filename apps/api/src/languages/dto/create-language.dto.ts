import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLanguageDto {
  @ApiProperty({
    description: 'The name of the language',
    example: 'English',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The language code (e.g., ISO 639-1 code)',
    example: 'en',
  })
  @IsString()
  @IsNotEmpty()
  code: string;
}
