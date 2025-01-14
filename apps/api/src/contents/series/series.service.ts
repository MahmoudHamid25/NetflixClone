import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Content } from '../entities/content.entity';
import { CreateSeriesDto } from './dto/create-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';

@Injectable()
export class SeriesService {
  constructor(
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>,
  ) {}

  // Create a new series
  async create(createSeriesDto: CreateSeriesDto): Promise<Content> {
    const series = this.contentRepository.create({
      ...createSeriesDto,
      type: 'series', // Ensure this is set as a series
    });
    return await this.contentRepository.save(series);
  }

  // Get all series
  async findAll(): Promise<Content[]> {
    return this.contentRepository.find({
      where: { type: 'series' },
    });
  }

  // Get a single series by ID
  async findOne(id: string): Promise<Content> {
    const series = await this.contentRepository.findOne({
      where: { id, type: 'series' },
    });
    if (!series) {
      throw new NotFoundException(`Series with ID ${id} not found`);
    }
    return series;
  }

  // Update a series
  async update(id: string, updateSeriesDto: UpdateSeriesDto): Promise<Content> {
    const series = await this.findOne(id);
    Object.assign(series, updateSeriesDto);
    return this.contentRepository.save(series);
  }

  // Delete a series
  async remove(id: string): Promise<void> {
    const series = await this.findOne(id);
    await this.contentRepository.remove(series);
  }
}
