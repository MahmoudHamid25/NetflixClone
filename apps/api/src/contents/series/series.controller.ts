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
import { SeriesService } from './series.service';
import { CreateSeriesDto } from './dto/create-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';
import { Content } from '../entities/content.entity';

@ApiTags('Series')
@Controller('')
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) {}

  @ApiOperation({ summary: 'Get all series' })
  @ApiResponse({ status: 200, description: 'List of series', type: [Content] })
  @Get()
  async findAll() {
    return this.seriesService.findAll();
  }

  @ApiOperation({ summary: 'Get a single series by ID' })
  @ApiResponse({ status: 200, description: 'Series details', type: Content })
  @ApiResponse({ status: 404, description: 'Series not found' })
  @ApiParam({ name: 'id', description: 'The series ID' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.seriesService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a new series' })
  @ApiResponse({
    status: 201,
    description: 'The series has been successfully created',
    type: Content,
  })
  @ApiBody({ type: CreateSeriesDto })
  @Post()
  async create(@Body() createSeriesDto: CreateSeriesDto) {
    return this.seriesService.create(createSeriesDto);
  }

  @ApiOperation({ summary: 'Update a series' })
  @ApiResponse({
    status: 200,
    description: 'The series has been successfully updated',
    type: Content,
  })
  @ApiResponse({ status: 404, description: 'Series not found' })
  @ApiParam({ name: 'id', description: 'The series ID' })
  @ApiBody({ type: UpdateSeriesDto })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSeriesDto: UpdateSeriesDto,
  ) {
    return this.seriesService.update(id, updateSeriesDto);
  }

  @ApiOperation({ summary: 'Delete a series' })
  @ApiResponse({
    status: 200,
    description: 'The series has been successfully deleted',
  })
  @ApiResponse({ status: 404, description: 'Series not found' })
  @ApiParam({ name: 'id', description: 'The series ID' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.seriesService.remove(id);
  }
}
