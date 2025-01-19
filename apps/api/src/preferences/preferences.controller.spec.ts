import { Test, TestingModule } from '@nestjs/testing';
import { PreferencesService } from './preferences.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Preference } from './entities/preference.entity';
import { Genre } from '../genres/entities/genre.entity';
import { Profile } from '../profiles/entities/profile.entity';
import { PreferencesController } from './preferences.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('PreferencesService', () => {
  let service: PreferencesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [], // Remove TypeOrmModule imports
      controllers: [PreferencesController],
      providers: [
        PreferencesService,
        {
          provide: getRepositoryToken(Preference),
          useClass: Repository, // Mock Repository
        },
        {
          provide: getRepositoryToken(Genre),
          useClass: Repository, // Mock Repository
        },
        {
          provide: getRepositoryToken(Profile),
          useClass: Repository, // Mock Repository
        },
      ],
    }).compile();

    service = module.get<PreferencesService>(PreferencesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
