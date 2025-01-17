import { Module } from '@nestjs/common';
import { WatchHistoriesService } from './watch-histories.service';
import { WatchHistoriesController } from './watch-histories.controller';
import { WatchHistory } from './entities/watch-history.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from '../contents/entities/content.entity';
import { Profile } from '../profiles/entities/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WatchHistory, Content, Profile])],
  controllers: [WatchHistoriesController],
  providers: [WatchHistoriesService],
  exports: [WatchHistoriesService],
})
export class WatchHistoriesModule {}
