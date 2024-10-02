import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      credentials: true,
      // methods: ['GET', 'POST'],
      origin: true,
    },
  });
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT');
  app.use(cookieParser());
  await app.listen(port);
  console.log(`Nest app is running on local port: http://localhost:${port}`);
}
bootstrap();
