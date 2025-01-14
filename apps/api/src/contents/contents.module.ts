import { Module } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { ContentsController } from './contents.controller';
import { Content } from './entities/content.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmsModule } from './films/films.module';
import { EpisodesModule } from './episodes/episodes.module';
import { SeasonsModule } from './seasons/seasons.module';
import { SeriesModule } from './series/series.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Content]),
    FilmsModule,
    EpisodesModule,
    SeasonsModule,
    SeriesModule,
  ],
  controllers: [ContentsController],
  providers: [ContentsService],
  exports: [ContentsService],
})
export class ContentsModule {}
