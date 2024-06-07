import { Test, TestingModule } from '@nestjs/testing';
import { HelloController } from './hello.controller';

describe('HelloController', () => {
  let controller: HelloController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HelloController],
    }).compile();

    controller = module.get<HelloController>(HelloController);
  });
  it('Should return "Hello a-name, here my first expierince with nest!"', () => {
    expect(controller.getHello('a-name')).toBe(
      'Hello a-name, here my first expierince with nest!!!',
    );
  });
});
