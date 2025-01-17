import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { LanguagesService } from './languages.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { Language } from './entities/language.entity';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/role.enum';
import { RolesGuard } from '../roles/roles.guard';

@ApiTags('Languages')
@Controller('languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.JUNIOR)
  @Post()
  @ApiOperation({ summary: 'Create a new language' })
  @ApiResponse({
    status: 201,
    description: 'The language has been successfully created.',
    type: Language,
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(@Body() createLanguageDto: CreateLanguageDto) {
    return this.languagesService.create(createLanguageDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all languages' })
  @ApiResponse({
    status: 200,
    description: 'A list of languages.',
    type: [Language],
  })
  findAll() {
    return this.languagesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a language by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the language',
    example: '123',
  })
  @ApiResponse({
    status: 200,
    description: 'The language details.',
    type: Language,
  })
  @ApiResponse({ status: 404, description: 'Language not found.' })
  findOne(@Param('id') id: string) {
    return this.languagesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a language by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the language',
    example: '123',
  })
  @ApiResponse({
    status: 200,
    description: 'The updated language details.',
    type: Language,
  })
  @ApiResponse({ status: 404, description: 'Language not found.' })
  update(
    @Param('id') id: string,
    @Body() updateLanguageDto: UpdateLanguageDto,
  ) {
    return this.languagesService.update(id, updateLanguageDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a language by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the language',
    example: '123',
  })
  @ApiResponse({
    status: 200,
    description: 'The language has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Language not found.' })
  remove(@Param('id') id: string) {
    return this.languagesService.remove(id);
  }
}
