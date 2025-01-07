import { Injectable } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
  ) {}

  create(createGenreDto: CreateGenreDto) {
    const newGenre = this.genreRepository.create(createGenreDto);
    return this.genreRepository.save(newGenre);
  }

  findAll() {
    return this.genreRepository.find();
  }

  findOne(id: string) {
    return this.genreRepository.findOne({ where: { id } });
  }

  update(id: string, updateGenreDto: UpdateGenreDto) {
    return this.genreRepository.update(id, updateGenreDto);
  }

  remove(id: string) {
    return this.genreRepository.delete(id);
  }
}
