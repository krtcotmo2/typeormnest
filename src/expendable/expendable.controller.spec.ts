import { Test, TestingModule } from '@nestjs/testing';
import { ExpendableController } from './expendable.controller';

describe('ExpendableController', () => {
  let controller: ExpendableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpendableController],
    }).compile();

    controller = module.get<ExpendableController>(ExpendableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
