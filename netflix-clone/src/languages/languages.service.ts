import { Injectable } from '@nestjs/common';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { Language } from './entities/language.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LanguagesService {
  constructor(
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
  ) {}

  create(createLanguageDto: CreateLanguageDto) {
    const newLanguage = this.languageRepository.create(createLanguageDto);
    return this.languageRepository.save(newLanguage);
  }

  findAll() {
    return this.languageRepository.find();
  }

  findOne(id: string) {
    return this.languageRepository.findOne({ where: { id } });
  }

  update(id: string, updateLanguageDto: UpdateLanguageDto) {
    return this.languageRepository.update(id, updateLanguageDto);
  }

  remove(id: string) {
    return this.languageRepository.delete(id);
  }
}
