import { Test, TestingModule } from '@nestjs/testing';
import { HelloController } from './hello.controller';
import { BadRequestException } from '@nestjs/common';

describe('Hello Controller', () => {
  let controller: HelloController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HelloController],
    }).compile();

    controller = module.get<HelloController>(HelloController);
  });

  it('should return "Hello a-name!"', () => {
    expect(controller.getHello('a-name')).toBe('Hello a-name!');
  });

  it('should throw BadRequestException if user-name is not provided', () => {
    expect(() => controller.getHello('')).toThrow(BadRequestException);
  });
});
