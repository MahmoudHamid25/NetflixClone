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
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@ApiTags('Profiles')
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new profile' })
  @ApiResponse({
    status: 201,
    description: 'The profile has been successfully created.',
    type: Profile,
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profilesService.create(createProfileDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all profiles' })
  @ApiResponse({
    status: 200,
    description: 'A list of profiles.',
    type: [Profile],
  })
  findAll() {
    return this.profilesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a profile by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the profile',
    example: '123',
  })
  @ApiResponse({
    status: 200,
    description: 'The profile details.',
    type: Profile,
  })
  @ApiResponse({ status: 404, description: 'Profile not found.' })
  findOne(@Param('id') id: string) {
    return this.profilesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a profile by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the profile',
    example: '123',
  })
  @ApiResponse({
    status: 200,
    description: 'The updated profile details.',
    type: Profile,
  })
  @ApiResponse({ status: 404, description: 'Profile not found.' })
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profilesService.update(id, updateProfileDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a profile by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the profile',
    example: '123',
  })
  @ApiResponse({
    status: 200,
    description: 'The profile has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Profile not found.' })
  remove(@Param('id') id: string) {
    return this.profilesService.remove(id);
  }
}
