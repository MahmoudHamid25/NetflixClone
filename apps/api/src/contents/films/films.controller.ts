import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { FilmsService } from './films.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { Content } from '../entities/content.entity';

@ApiTags('Films')
@Controller('')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @ApiOperation({ summary: 'Retrieve all films' })
  @ApiResponse({
    status: 200,
    description: 'List of all films',
    type: [Content],
  })
  @Get()
  async findAll() {
    return this.filmsService.findAll();
  }

  @ApiOperation({ summary: 'Retrieve a single film by ID' })
  @ApiResponse({ status: 200, description: 'Film details', type: Content })
  @ApiResponse({ status: 404, description: 'Film not found' })
  @ApiParam({ name: 'id', description: 'The ID of the film', type: String })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.filmsService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a new film' })
  @ApiResponse({
    status: 201,
    description: 'The film has been successfully created',
    type: Content,
  })
  @ApiBody({ type: CreateFilmDto })
  @Post()
  async create(@Body() createFilmDto: CreateFilmDto) {
    return this.filmsService.create(createFilmDto);
  }

  @ApiOperation({ summary: 'Update an existing film' })
  @ApiResponse({
    status: 200,
    description: 'The film has been successfully updated',
    type: Content,
  })
  @ApiResponse({ status: 404, description: 'Film not found' })
  @ApiParam({ name: 'id', description: 'The ID of the film', type: String })
  @ApiBody({ type: UpdateFilmDto })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateFilmDto: UpdateFilmDto) {
    return this.filmsService.update(id, updateFilmDto);
  }

  @ApiOperation({ summary: 'Delete a film' })
  @ApiResponse({
    status: 200,
    description: 'The film has been successfully deleted',
  })
  @ApiResponse({ status: 404, description: 'Film not found' })
  @ApiParam({ name: 'id', description: 'The ID of the film', type: String })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.filmsService.remove(id);
  }
}
