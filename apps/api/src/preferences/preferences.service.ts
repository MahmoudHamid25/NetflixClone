import { Injectable } from '@nestjs/common';
import { CreatePreferenceDto } from './dto/create-preference.dto';
import { UpdatePreferenceDto } from './dto/update-preference.dto';
import { Preference } from './entities/preference.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from '../genres/entities/genre.entity';
import { Profile } from '../profiles/entities/profile.entity';

@Injectable()
export class PreferencesService {
  constructor(
    @InjectRepository(Preference)
    private preferenceRepository: Repository<Preference>,
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async create(createPreferenceDto: CreatePreferenceDto): Promise<Preference> {
    const { genres, profileId, ...rest } = createPreferenceDto;

    // Resolve genres into Genre entities
    let genreEntities: Genre[] = [];
    if (genres && genres.length > 0) {
      genreEntities = await this.genreRepository.find({
        where: { id: In(genres) },
      });

      if (genreEntities.length !== genres.length) {
        throw new Error('Some genres provided do not exist.');
      }
    }

    // Resolve the profile
    let profile: Profile | null = null;
    if (profileId) {
      profile = await this.profileRepository.findOne({
        where: { id: profileId },
      });
      if (!profile) {
        throw new Error(`Profile with id ${profileId} not found.`);
      }
    }

    // Create the new Preference object
    const newPreference = this.preferenceRepository.create({
      ...rest,
      genres: genreEntities,
      profile,
    });

    // Save and return the new Preference object
    return this.preferenceRepository.save(newPreference);
  }

  findAll() {
    return this.preferenceRepository.find();
  }

  findOne(id: string) {
    return this.preferenceRepository.findOne({ where: { id } });
  }

  async update(
    id: string,
    updatePreferenceDto: UpdatePreferenceDto,
  ): Promise<Preference> {
    const { genres, ...rest } = updatePreferenceDto;

    // If genres are provided, resolve them into Genre entities
    if (genres && genres.length > 0) {
      const genreEntities = await this.genreRepository.find({
        where: { id: In(genres) },
      });
      updatePreferenceDto.genres = genreEntities;
    }

    await this.preferenceRepository.update(id, updatePreferenceDto);

    return this.preferenceRepository.findOne({ where: { id } });
  }

  remove(id: string) {
    return this.preferenceRepository.delete(id);
  }
}
