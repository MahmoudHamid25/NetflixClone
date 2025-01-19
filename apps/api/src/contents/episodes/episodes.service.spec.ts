import { Test, TestingModule } from '@nestjs/testing';
import { EpisodesService } from './episodes.service';
import { EpisodesController } from './episodes.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Content } from '../entities/content.entity';

describe('EpisodesService', () => {
  let service: EpisodesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [EpisodesController],
      providers: [
        EpisodesService,
        {
          provide: getRepositoryToken(Content),
          useClass: Repository, // Mock Repository
        },
      ],
    }).compile();

    service = module.get<EpisodesService>(EpisodesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
