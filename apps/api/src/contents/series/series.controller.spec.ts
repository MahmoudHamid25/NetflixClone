import { Test, TestingModule } from '@nestjs/testing';
import { SeriesService } from './series.service';
import { SeriesController } from './series.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Content } from '../entities/content.entity';

describe('SeriesService', () => {
  let service: SeriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [SeriesController],
      providers: [
        SeriesService,
        {
          provide: getRepositoryToken(Content),
          useClass: Repository, // Mock Repository
        },
      ],
    }).compile();

    service = module.get<SeriesService>(SeriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
