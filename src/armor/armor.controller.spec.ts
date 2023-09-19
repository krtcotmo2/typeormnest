import { Test, TestingModule } from '@nestjs/testing';
import { ArmorController } from './armor.controller';

describe('ArmorController', () => {
  let controller: ArmorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArmorController],
    }).compile();

    controller = module.get<ArmorController>(ArmorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
