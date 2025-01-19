import { Test, TestingModule } from '@nestjs/testing';
import { LanguagesService } from './languages.service';
import { LanguagesController } from './languages.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Language } from './entities/language.entity';
import { AccessControlModule } from '../roles/access-control.module';

describe('LanguagesService', () => {
  let service: LanguagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AccessControlModule], // Include the necessary module
      controllers: [LanguagesController],
      providers: [
        LanguagesService,
        {
          provide: getRepositoryToken(Language),
          useClass: Repository, // Mock Repository
        },
      ],
    }).compile();

    service = module.get<LanguagesService>(LanguagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
