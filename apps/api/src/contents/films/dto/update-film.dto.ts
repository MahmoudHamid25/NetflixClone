import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateFilmDto } from './create-film.dto';

export class UpdateFilmDto extends PartialType(CreateFilmDto) {
  @ApiPropertyOptional({
    description: 'Title of the film',
    example: 'Updated Inception',
  })
  title?: string;

  @ApiPropertyOptional({
    description: 'Description of the film',
    example: 'Updated description',
  })
  description?: string;
}
