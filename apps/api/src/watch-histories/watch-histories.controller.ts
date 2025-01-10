import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WatchHistoriesService } from './watch-histories.service';
import { CreateWatchHistoryDto } from './dto/create-watch-history.dto';
import { UpdateWatchHistoryDto } from './dto/update-watch-history.dto';

@Controller('watchHistories')
export class WatchHistoriesController {
  constructor(private readonly watchHistoriesService: WatchHistoriesService) {}

  @Post()
  create(@Body() createWatchHistoryDto: CreateWatchHistoryDto) {
    return this.watchHistoriesService.create(createWatchHistoryDto);
  }

  @Get()
  findAll() {
    return this.watchHistoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.watchHistoriesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWatchHistoryDto: UpdateWatchHistoryDto,
  ) {
    return this.watchHistoriesService.update(id, updateWatchHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.watchHistoriesService.remove(id);
  }
}
