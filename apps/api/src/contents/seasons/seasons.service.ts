import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Content } from '../entities/content.entity';
import { CreateSeasonDto } from './dto/create-season.dto';
import { UpdateSeasonDto } from './dto/update-season.dto';

@Injectable()
export class SeasonsService {
  constructor(
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>,
  ) {}

  async create(createSeasonDto: CreateSeasonDto): Promise<Content> {
    const season = this.contentRepository.create({
      ...createSeasonDto,
      parent_content_id: createSeasonDto.series_id,
      type: 'season',
    });
    return await this.contentRepository.save(season);
  }

  async findAllBySeries(seriesId: string): Promise<Content[]> {
    return this.contentRepository.find({
      where: { parent_content_id: seriesId, type: 'season' },
    });
  }

  async findOne(id: string): Promise<Content> {
    const season = await this.contentRepository.findOne({
      where: { id, type: 'season' },
    });
    if (!season) {
      throw new NotFoundException(`Season with ID ${id} not found`);
    }
    return season;
  }

  async update(id: string, updateSeasonDto: UpdateSeasonDto): Promise<Content> {
    const season = await this.findOne(id);
    Object.assign(season, updateSeasonDto);
    return this.contentRepository.save(season);
  }

  async remove(id: string): Promise<void> {
    const season = await this.findOne(id);
    await this.contentRepository.remove(season);
  }
}
