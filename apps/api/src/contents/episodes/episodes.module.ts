import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from '../entities/content.entity';
import { EpisodesController } from './episodes.controller';
import { EpisodesService } from './episodes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Content])],
  controllers: [EpisodesController],
  providers: [EpisodesService],
})
export class EpisodesModule {}
