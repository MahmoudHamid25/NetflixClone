import { Injectable } from '@nestjs/common';
import { CreatePreferenceDto } from './dto/create-preference.dto';
import { UpdatePreferenceDto } from './dto/update-preference.dto';
import { Preference } from './entities/preference.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PreferencesService {
  constructor(
    @InjectRepository(Preference)
    private preferenceRepository: Repository<Preference>,
  ) {}

  create(createPreferenceDto: CreatePreferenceDto) {
    const newPreference = this.preferenceRepository.create(createPreferenceDto);
    return this.preferenceRepository.save(newPreference);
  }

  findAll() {
    return this.preferenceRepository.find();
  }

  findOne(id: string) {
    return this.preferenceRepository.findOne({ where: { id } });
  }

  update(id: string, updatePreferenceDto: UpdatePreferenceDto) {
    return this.preferenceRepository.update(id, updatePreferenceDto);
  }

  remove(id: string) {
    return this.preferenceRepository.delete(id);
  }
}
