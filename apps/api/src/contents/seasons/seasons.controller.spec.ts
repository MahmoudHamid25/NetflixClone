import { Test, TestingModule } from '@nestjs/testing';
import { SeasonsService } from './seasons.service';
import { SeasonsController } from './seasons.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Content } from '../entities/content.entity';

describe('SeasonsService', () => {
  let service: SeasonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [SeasonsController],
      providers: [
        SeasonsService,
        {
          provide: getRepositoryToken(Content),
          useClass: Repository, // Mock Repository
        },
      ],
    }).compile();

    service = module.get<SeasonsService>(SeasonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
