import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  create(createProfileDto: CreateProfileDto) {
    const newProfile = this.profileRepository.create(createProfileDto);
    return this.profileRepository.save(newProfile);
  }

  findAll() {
    return this.profileRepository.find();
  }

  findOne(id: string) {
    return this.profileRepository.findOne({ where: { id } });
  }

  update(id: string, updateProfileDto: UpdateProfileDto) {
    return this.profileRepository.update(id, updateProfileDto);
  }

  remove(id: string) {
    return this.profileRepository.delete(id);
  }
}
