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
import { SeasonsService } from './seasons.service';
import { CreateSeasonDto } from './dto/create-season.dto';
import { UpdateSeasonDto } from './dto/update-season.dto';
import { Content } from '../entities/content.entity';

@ApiTags('Seasons')
@Controller('')
export class SeasonsController {
  constructor(private readonly seasonsService: SeasonsService) {}

  @ApiOperation({ summary: 'Get all seasons of a series' })
  @ApiResponse({ status: 200, description: 'List of seasons', type: [Content] })
  @ApiParam({ name: 'seriesId', description: 'The series ID' })
  @Get('series/:seriesId')
  async findAll(@Param('seriesId') seriesId: string) {
    return this.seasonsService.findAllBySeries(seriesId);
  }

  @ApiOperation({ summary: 'Get a single season by ID' })
  @ApiResponse({ status: 200, description: 'Season details', type: Content })
  @ApiResponse({ status: 404, description: 'Season not found' })
  @ApiParam({ name: 'id', description: 'The season ID' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.seasonsService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a new season' })
  @ApiResponse({
    status: 201,
    description: 'The season has been successfully created',
    type: Content,
  })
  @ApiBody({ type: CreateSeasonDto })
  @Post()
  async create(@Body() createSeasonDto: CreateSeasonDto) {
    return this.seasonsService.create(createSeasonDto);
  }

  @ApiOperation({ summary: 'Update a season' })
  @ApiResponse({
    status: 200,
    description: 'The season has been successfully updated',
    type: Content,
  })
  @ApiResponse({ status: 404, description: 'Season not found' })
  @ApiParam({ name: 'id', description: 'The season ID' })
  @ApiBody({ type: UpdateSeasonDto })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSeasonDto: UpdateSeasonDto,
  ) {
    return this.seasonsService.update(id, updateSeasonDto);
  }

  @ApiOperation({ summary: 'Delete a season' })
  @ApiResponse({
    status: 200,
    description: 'The season has been successfully deleted',
  })
  @ApiResponse({ status: 404, description: 'Season not found' })
  @ApiParam({ name: 'id', description: 'The season ID' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.seasonsService.remove(id);
  }
}
