import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from '../entities/content.entity';
import { SeriesController } from './series.controller';
import { SeriesService } from './series.service';

@Module({
  imports: [TypeOrmModule.forFeature([Content])],
  controllers: [SeriesController],
  providers: [SeriesService],
})
export class SeriesModule {}
