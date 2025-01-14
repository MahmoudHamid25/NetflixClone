import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { EpisodesService } from './episodes.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';
import { Content } from '../entities/content.entity';

@ApiTags('Episodes')
@Controller('')
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) {}

  @ApiOperation({ summary: 'Get all episodes of a season' })
  @ApiResponse({
    status: 200,
    description: 'List of episodes',
    type: [Content],
  })
  @ApiParam({ name: 'seasonId', description: 'The season ID' })
  @Get('season/:seasonId')
  async findAll(@Param('seasonId') seasonId: string) {
    return this.episodesService.findAllBySeason(seasonId);
  }

  @ApiOperation({ summary: 'Get a single episode by ID' })
  @ApiResponse({ status: 200, description: 'Episode details', type: Content })
  @ApiResponse({ status: 404, description: 'Episode not found' })
  @ApiParam({ name: 'id', description: 'The episode ID' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.episodesService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a new episode' })
  @ApiResponse({
    status: 201,
    description: 'The episode has been successfully created',
    type: Content,
  })
  @ApiBody({ type: CreateEpisodeDto })
  @Post()
  async create(@Body() createEpisodeDto: CreateEpisodeDto) {
    return this.episodesService.create(createEpisodeDto);
  }

  @ApiOperation({ summary: 'Update an episode' })
  @ApiResponse({
    status: 200,
    description: 'The episode has been successfully updated',
    type: Content,
  })
  @ApiResponse({ status: 404, description: 'Episode not found' })
  @ApiParam({ name: 'id', description: 'The episode ID' })
  @ApiBody({ type: UpdateEpisodeDto })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEpisodeDto: UpdateEpisodeDto,
  ) {
    return this.episodesService.update(id, updateEpisodeDto);
  }

  @ApiOperation({ summary: 'Delete an episode' })
  @ApiResponse({
    status: 200,
    description: 'The episode has been successfully deleted',
  })
  @ApiResponse({ status: 404, description: 'Episode not found' })
  @ApiParam({ name: 'id', description: 'The episode ID' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.episodesService.remove(id);
  }
}
