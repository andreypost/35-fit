import { TestingModule, Test } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const appModule: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = appModule.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World from Nest.js server!"', () => {
      expect(appController.getHello()).toBe('Hello World from Nest.js server!');
    });
  });
});
