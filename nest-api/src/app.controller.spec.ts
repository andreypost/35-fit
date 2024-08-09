import { Test, TestingModule } from '@nestjs/testing';
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
    it('Should return "Hello World from Nest.js server!"', async () => {
      expect(appController.getHello()).toBe('Hello World from Nest.js server!');
    });
  });
});
