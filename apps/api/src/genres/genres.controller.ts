import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';
import { Public } from 'src/auth/public.decorator';

@ApiTags('Genres')
@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new genre' })
  @ApiResponse({
    status: 201,
    description: 'The genre has been successfully created.',
    type: Genre,
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genresService.create(createGenreDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Retrieve all genres' })
  @ApiResponse({
    status: 200,
    description: 'A list of genres.',
    type: [Genre],
  })
  findAll() {
    return this.genresService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a genre by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the genre', example: '123' })
  @ApiResponse({
    status: 200,
    description: 'The genre details.',
    type: Genre,
  })
  @ApiResponse({ status: 404, description: 'Genre not found.' })
  findOne(@Param('id') id: string) {
    return this.genresService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a genre by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the genre', example: '123' })
  @ApiResponse({
    status: 200,
    description: 'The updated genre details.',
    type: Genre,
  })
  @ApiResponse({ status: 404, description: 'Genre not found.' })
  update(@Param('id') id: string, @Body() updateGenreDto: UpdateGenreDto) {
    return this.genresService.update(id, updateGenreDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a genre by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the genre', example: '123' })
  @ApiResponse({
    status: 200,
    description: 'The genre has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Genre not found.' })
  remove(@Param('id') id: string) {
    return this.genresService.remove(id);
  }
}
