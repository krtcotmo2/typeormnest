import { Test, TestingModule } from '@nestjs/testing';
import { ToHitService } from './to-hit.service';

describe('ToHitService', () => {
  let service: ToHitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ToHitService],
    }).compile();

    service = module.get<ToHitService>(ToHitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
