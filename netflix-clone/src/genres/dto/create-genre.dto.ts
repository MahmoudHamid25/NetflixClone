import { PartialType } from '@nestjs/swagger';
import { IsString,  } from 'class-validator';

export class CreateGenreDto {
    @IsString()
    name: string;

    @IsString()
    description: string;
}
