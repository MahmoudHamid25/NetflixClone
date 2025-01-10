import { Module } from '@nestjs/common';
import { WatchHistoriesService } from './watch-histories.service';
import { WatchHistoriesController } from './watch-histories.controller';
import { WatchHistory } from './entities/watch-history.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([WatchHistory])],
  controllers: [WatchHistoriesController],
  providers: [WatchHistoriesService],
  exports: [WatchHistoriesService],
})
export class WatchHistoriesModule {}
