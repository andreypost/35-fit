import { Test, TestingModule } from '@nestjs/testing';
import { HelloController } from './hello.controller';
import { BadRequestException } from '@nestjs/common';

describe('HelloController', () => {
  let helloController: HelloController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HelloController],
    }).compile();

    helloController = module.get<HelloController>(HelloController);
  });

  it('should throw BadRequestException if user name is not provided', async () => {
    expect.assertions(1);

    try {
      await helloController.getHello('');
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });

  it('should return "Hello a-name!"', async () => {
    expect(await helloController.getHello('a-name')).toBe('Hello a-name!');
  });
});
