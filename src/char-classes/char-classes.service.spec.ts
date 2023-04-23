import { Test, TestingModule } from '@nestjs/testing';
import { CharClassesService } from './char-classes.service';

describe('CharClassesService', () => {
  let service: CharClassesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CharClassesService],
    }).compile();

    service = module.get<CharClassesService>(CharClassesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
