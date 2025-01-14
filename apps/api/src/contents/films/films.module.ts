import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from '../entities/content.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Content])],
  controllers: [FilmsController],
  providers: [FilmsService],
})
export class FilmsModule {}
