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
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { WatchHistory } from './entities/watch-history.entity';

@ApiTags('Watch Histories')
@Controller('watchHistories')
export class WatchHistoriesController {
  constructor(private readonly watchHistoriesService: WatchHistoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new watch history' })
  @ApiResponse({
    status: 201,
    description: 'The watch history has been created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createWatchHistoryDto: CreateWatchHistoryDto) {
    return this.watchHistoriesService.create(createWatchHistoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all watch histories' })
  @ApiResponse({
    status: 200,
    description: 'The list of watch histories',
    type: [WatchHistory],
  })
  findAll() {
    return this.watchHistoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a watch history by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The ID of the watch history',
  })
  @ApiResponse({
    status: 200,
    description: 'The found watch history',
    type: WatchHistory,
  })
  @ApiResponse({ status: 404, description: 'Watch history not found' })
  findOne(@Param('id') id: string) {
    return this.watchHistoriesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a watch history' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The ID of the watch history',
  })
  @ApiResponse({
    status: 200,
    description: 'The watch history has been updated.',
    type: WatchHistory,
  })
  @ApiResponse({ status: 400, description: 'Invalid data.' })
  @ApiResponse({ status: 404, description: 'Watch history not found.' })
  update(
    @Param('id') id: string,
    @Body() updateWatchHistoryDto: UpdateWatchHistoryDto,
  ) {
    return this.watchHistoriesService.update(id, updateWatchHistoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a watch history' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The ID of the watch history',
  })
  @ApiResponse({
    status: 200,
    description: 'The watch history has been deleted.',
  })
  @ApiResponse({ status: 404, description: 'Watch history not found.' })
  remove(@Param('id') id: string) {
    return this.watchHistoriesService.remove(id);
  }
}
