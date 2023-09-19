import { Test, TestingModule } from '@nestjs/testing';
import { ToHitController } from './to-hit.controller';

describe('ToHitController', () => {
  let controller: ToHitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ToHitController],
    }).compile();

    controller = module.get<ToHitController>(ToHitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
