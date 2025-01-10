import { Injectable } from '@nestjs/common';
import { CreateWatchHistoryDto } from './dto/create-watch-history.dto';
import { UpdateWatchHistoryDto } from './dto/update-watch-history.dto';
import { WatchHistory } from './entities/watch-history.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class WatchHistoriesService {
  constructor(
    @InjectRepository(WatchHistory)
    private watchHistoryRepository: Repository<WatchHistory>,
  ) {}

  create(createWatchHistoryDto: CreateWatchHistoryDto) {
    const newWatchHistory = this.watchHistoryRepository.create(
      createWatchHistoryDto,
    );
    return this.watchHistoryRepository.save(newWatchHistory);
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
