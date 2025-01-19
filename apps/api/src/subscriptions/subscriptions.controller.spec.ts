import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsController } from './subscriptions.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './entities/subscription.entity';

describe('SubscriptionsService', () => {
  let service: SubscriptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [SubscriptionsController],
      providers: [
        SubscriptionsService,
        {
          provide: getRepositoryToken(Subscription),
          useClass: Repository, // Mock Repository
        },
      ],
    }).compile();

    service = module.get<SubscriptionsService>(SubscriptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
