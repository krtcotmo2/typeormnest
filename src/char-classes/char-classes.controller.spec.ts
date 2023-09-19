import { Test, TestingModule } from '@nestjs/testing';
import { CharClassesController } from './char-classes.controller';

describe('CharClassesController', () => {
  let controller: CharClassesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CharClassesController],
    }).compile();

    controller = module.get<CharClassesController>(CharClassesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
