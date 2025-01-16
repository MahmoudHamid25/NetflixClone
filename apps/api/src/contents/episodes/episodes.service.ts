import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Content } from '../entities/content.entity';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';

@Injectable()
export class EpisodesService {
  constructor(
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>,
  ) {}

  async create(createEpisodeDto: CreateEpisodeDto): Promise<Content> {
    const episode = this.contentRepository.create({
      ...createEpisodeDto,
      parent_content_id: createEpisodeDto.season_id,
      type: 'film',
    });
    return await this.contentRepository.save(episode);
  }

  async findAllBySeason(seasonId: string): Promise<Content[]> {
    return this.contentRepository.find({
      where: { parent_content_id: seasonId },
    });
  }

  async findOne(id: string): Promise<Content> {
    const episode = await this.contentRepository.findOne({
      where: { id, type: 'episode' },
    });
    if (!episode) {
      throw new NotFoundException(`Episode with ID ${id} not found`);
    }
    return episode;
  }

  async update(
    id: string,
    updateEpisodeDto: UpdateEpisodeDto,
  ): Promise<Content> {
    const episode = await this.findOne(id);
    Object.assign(episode, updateEpisodeDto);
    return this.contentRepository.save(episode);
  }

  async remove(id: string): Promise<void> {
    const episode = await this.findOne(id);
    await this.contentRepository.remove(episode);
  }
}
