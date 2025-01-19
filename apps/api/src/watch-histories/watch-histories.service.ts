import { Injectable } from '@nestjs/common';
import { CreateWatchHistoryDto } from './dto/create-watch-history.dto';
import { UpdateWatchHistoryDto } from './dto/update-watch-history.dto';
import { WatchHistory } from './entities/watch-history.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from '../contents/entities/content.entity';
import { Profile } from '../profiles/entities/profile.entity';

@Injectable()
export class WatchHistoriesService {
  constructor(
    @InjectRepository(WatchHistory)
    private watchHistoryRepository: Repository<WatchHistory>,
    @InjectRepository(Content)
    private contentRepository: Repository<Content>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async create(
    createWatchHistoryDto: CreateWatchHistoryDto,
  ): Promise<WatchHistory> {
    const profile = await this.profileRepository.findOne({
      where: { id: createWatchHistoryDto.profileId },
    });

    if (!profile) {
      throw new Error('Profile not found');
    }

    const content = await this.contentRepository.findOne({
      where: { id: createWatchHistoryDto.contentId },
    });

    if (!content) {
      throw new Error('Content not found');
    }

    const watchHistory = this.watchHistoryRepository.create({
      profile,
      content,
      stoppedAt: createWatchHistoryDto.stoppedAt,
      watchCount: createWatchHistoryDto.watchCount,
      subtitles: createWatchHistoryDto.subtitles,
      dubs: createWatchHistoryDto.dubs,
    });

    return this.watchHistoryRepository.save(watchHistory);
  }

  findAll() {
    return this.watchHistoryRepository.find();
  }

  findOne(id: string) {
    return this.watchHistoryRepository.findOne({ where: { id } });
  }

  update(id: string, updateWatchHistoryDto: UpdateWatchHistoryDto) {
    return this.watchHistoryRepository.update(id, updateWatchHistoryDto);
  }

  remove(id: string) {
    return this.watchHistoryRepository.delete(id);
  }
}
