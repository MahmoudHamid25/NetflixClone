import { Test, TestingModule } from '@nestjs/testing';
import { WatchHistoriesService } from './watch-histories.service';

describe('WatchHistoriesService', () => {
  let service: WatchHistoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WatchHistoriesService],
    }).compile();

    service = module.get<WatchHistoriesService>(WatchHistoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
