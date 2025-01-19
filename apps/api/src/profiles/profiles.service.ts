import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Language } from '../languages/entities/language.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
  ) {}

  async create(createProfileDto: CreateProfileDto): Promise<Profile> {
    const { userId, image, dateOfBirth, languageId } = createProfileDto;

    // Find the User entity by userId
    const user = await this.userRepository.findOneById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Find the Language entity by languageId (if provided)
    let language = null;
    if (languageId) {
      language = await this.languageRepository.findOneById(languageId);
      if (!language) {
        throw new Error('Language not found');
      }
    }

    // Create and save the Profile entity
    const profile = this.profileRepository.create({
      user,
      image,
      dateOfBirth,
      language,
    });

    return this.profileRepository.save(profile);
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
