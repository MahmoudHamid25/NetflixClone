import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from '../entities/content.entity';
import { SeasonsController } from './seasons.controller';
import { SeasonsService } from './seasons.service';

@Module({
  imports: [TypeOrmModule.forFeature([Content])],
  controllers: [SeasonsController],
  providers: [SeasonsService],
})
export class SeasonsModule {}
