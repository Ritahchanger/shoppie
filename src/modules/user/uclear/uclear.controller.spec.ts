import { Test, TestingModule } from '@nestjs/testing';
import { UclearController } from './uclear.controller';

describe('UclearController', () => {
  let controller: UclearController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UclearController],
    }).compile();

    controller = module.get<UclearController>(UclearController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
