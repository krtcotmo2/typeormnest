import { Test, TestingModule } from '@nestjs/testing';
import { FeatService } from './feat.service';

describe('FeatService', () => {
  let service: FeatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeatService],
    }).compile();

    service = module.get<FeatService>(FeatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
