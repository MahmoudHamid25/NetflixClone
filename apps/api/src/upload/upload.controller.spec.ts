import { Test, TestingModule } from '@nestjs/testing';
import { UploadController } from './upload.controller';
import { CloudinaryService } from './cloudinary.service';

describe('UploadModule', () => {
  let controller: UploadController;
  let service: CloudinaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [UploadController],
      providers: [
        {
          provide: CloudinaryService,
          useValue: {
            uploadImage: jest.fn().mockResolvedValue('mocked-url'),
          },
        },
      ],
    }).compile();

    controller = module.get<UploadController>(UploadController);
    service = module.get<CloudinaryService>(CloudinaryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
