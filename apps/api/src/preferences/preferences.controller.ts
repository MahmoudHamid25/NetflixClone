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
import { PreferencesService } from './preferences.service';
import { CreatePreferenceDto } from './dto/create-preference.dto';
import { UpdatePreferenceDto } from './dto/update-preference.dto';
import { Preference } from './entities/preference.entity';

@ApiTags('Preferences')
@Controller('preferences')
export class PreferencesController {
  constructor(private readonly preferencesService: PreferencesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new preference' })
  @ApiResponse({
    status: 201,
    description: 'The preference has been successfully created.',
    type: Preference,
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(@Body() createPreferenceDto: CreatePreferenceDto) {
    return this.preferencesService.create(createPreferenceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all preferences' })
  @ApiResponse({
    status: 200,
    description: 'A list of preferences.',
    type: [Preference],
  })
  findAll() {
    return this.preferencesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a preference by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the preference',
    example: '123',
  })
  @ApiResponse({
    status: 200,
    description: 'The preference details.',
    type: Preference,
  })
  @ApiResponse({ status: 404, description: 'Preference not found.' })
  findOne(@Param('id') id: string) {
    return this.preferencesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a preference by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the preference',
    example: '123',
  })
  @ApiResponse({
    status: 200,
    description: 'The updated preference details.',
    type: Preference,
  })
  @ApiResponse({ status: 404, description: 'Preference not found.' })
  update(
    @Param('id') id: string,
    @Body() updatePreferenceDto: UpdatePreferenceDto,
  ) {
    return this.preferencesService.update(id, updatePreferenceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a preference by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the preference',
    example: '123',
  })
  @ApiResponse({
    status: 200,
    description: 'The preference has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Preference not found.' })
  remove(@Param('id') id: string) {
    return this.preferencesService.remove(id);
  }
}
