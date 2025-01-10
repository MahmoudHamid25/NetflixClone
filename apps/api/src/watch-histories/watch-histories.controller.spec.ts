import { Test, TestingModule } from '@nestjs/testing';
import { WatchHistoriesController } from './watch-histories.controller';
import { WatchHistoriesService } from './watch-histories.service';

describe('WatchHistoriesController', () => {
  let controller: WatchHistoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WatchHistoriesController],
      providers: [WatchHistoriesService],
    }).compile();

    controller = module.get<WatchHistoriesController>(WatchHistoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
