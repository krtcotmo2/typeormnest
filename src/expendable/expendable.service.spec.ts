import { Test, TestingModule } from '@nestjs/testing';
import { ExpendableService } from './expendable.service';

describe('ExpendableService', () => {
  let service: ExpendableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpendableService],
    }).compile();

    service = module.get<ExpendableService>(ExpendableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
