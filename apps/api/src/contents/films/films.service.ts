import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Content } from '../entities/content.entity';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>,
  ) {}

  async findAll(): Promise<Content[]> {
    return this.contentRepository.find({ where: { type: 'film' } });
  }

  async findOne(id: string): Promise<Content> {
    const film = await this.contentRepository.findOne({
      where: { id, type: 'film' },
    });
    if (!film) {
      throw new NotFoundException(`Film with ID ${id} not found`);
    }
    return film;
  }

  async create(createFilmDto: CreateFilmDto): Promise<Content> {
    const film = this.contentRepository.create({
      ...createFilmDto,
      type: 'film',
    });
    return this.contentRepository.save(film);
  }

  async update(id: string, updateFilmDto: UpdateFilmDto): Promise<Content> {
    const film = await this.findOne(id);
    Object.assign(film, updateFilmDto);
    return this.contentRepository.save(film);
  }

  async remove(id: string): Promise<void> {
    const film = await this.findOne(id);
    await this.contentRepository.remove(film);
  }
}
