import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { AuthGuard } from './auth/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      credentials: true,
      // methods: ['GET', 'POST'],
      origin: true,
    },
  });

  // global validation
  app.useGlobalPipes(new ValidationPipe());

  // global guards with dependency injection
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new AuthGuard(reflector));

  // configuration values
  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT');

  // middleware
  app.use(cookieParser());

  await app.listen(port);
  console.log(`Nest app is running on local port: http://localhost:${port}`);
}
bootstrap();
