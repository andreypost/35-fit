import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { AuthGuard } from './auth/auth.guard';
// import { LogginInterceptor } from './interceptors/loggin.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      credentials: true,
      // methods: ['GET', 'POST'],
      origin: true,
    },
  });

  // configuration values
  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT');

  // middlewares
  app.use(cookieParser());

  // global guards with dependency injection
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new AuthGuard(reflector));

  // global validation
  app.useGlobalPipes(new ValidationPipe());

  // global interceptors
  // app.useGlobalInterceptors(new LogginInterceptor());

  app.use((req, res, next) => {
    if (req.url === '/accessory/check') {
      console.log(`🟢 Request started: ${req.method} ${req.url}`);
    }
    req.on('close', () => {
      if (req.url === '/accessory/check') {
        console.log(`🔴 Request closed: ${req.method} ${req.url}`);
      }
    });
    next();
  });

  await app.listen(port);
  console.log(`Nest app is running on local port: http://localhost:${port}`);
}

bootstrap();
