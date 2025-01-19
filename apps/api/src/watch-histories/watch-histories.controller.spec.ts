import { Test, TestingModule } from '@nestjs/testing';
import { WatchHistoriesService } from './watch-histories.service';
import { WatchHistoriesController } from './watch-histories.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WatchHistory } from './entities/watch-history.entity';
import { Content } from '../contents/entities/content.entity';
import { Profile } from '../profiles/entities/profile.entity';

describe('WatchHistoriesService', () => {
  let service: WatchHistoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [WatchHistoriesController],
      providers: [
        WatchHistoriesService,
        {
          provide: getRepositoryToken(WatchHistory),
          useClass: Repository, // Mock Repository
        },
        {
          provide: getRepositoryToken(Content),
          useClass: Repository, // Mock Repository
        },
        {
          provide: getRepositoryToken(Profile),
          useClass: Repository, // Mock Repository
        },
      ],
    }).compile();

    service = module.get<WatchHistoriesService>(WatchHistoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
