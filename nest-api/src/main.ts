import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { AuthGuard } from './guards/auth.guard';
import { ExecutionTimeInterceptor } from './interceptors/execution.time';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      credentials: true,
      // methods: ['GET', 'POST'],
      origin: true,
    },
    forceCloseConnections: true,
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
  app.useGlobalInterceptors(new ExecutionTimeInterceptor());

  // initializing Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('35-fit nest-api')
    .setDescription('The NEST-API description for the 35-fit project')
    .setVersion('1.0')
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('nest-api', app, documentFactory);

  await app.listen(port);
  console.log(`Nest app is running on local port: http://localhost:${port}`);
  console.log();
  console.log(`You should see the Swagger UI: http://localhost:3000/nest-api`);
}

bootstrap();
