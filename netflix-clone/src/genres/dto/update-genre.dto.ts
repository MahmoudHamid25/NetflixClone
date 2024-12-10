import { PartialType } from '@nestjs/swagger';
import { CreateGenreDto } from './create-genre.dto';
import { IsString,  } from 'class-validator';

export class UpdateGenreDto extends PartialType(CreateGenreDto) {

    @IsString()
    name: string;

    @IsString()
    description: string;
}
