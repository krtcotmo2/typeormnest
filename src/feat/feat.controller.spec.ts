import { Test, TestingModule } from '@nestjs/testing';
import { FeatController } from './feat.controller';

describe('FeatController', () => {
  let controller: FeatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeatController],
    }).compile();

    controller = module.get<FeatController>(FeatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
