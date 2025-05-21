import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { AuthGuard } from './guards/auth.guard';
import { ExecutionTimeInterceptor } from './interceptors/execution.time';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as YAML from 'yaml';
import { writeFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      credentials: true,
      // methods: ['GET', 'POST'],
      origin: process.env.HEADLESS_URL || 'http://localhost:3000',
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
    .addBearerAuth()
    .addSecurityRequirements('bearer')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .addTag('nest-api')
    .addServer('http://localhost:3000')
    .build();

  const documentFactory = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('nest-api-swagger', app, documentFactory, {
    jsonDocumentUrl: 'nest-api-swagger/json',
  });

  const yamlString = YAML.stringify(documentFactory);

  writeFileSync('./openapi.yaml', yamlString, 'utf8');

  await app.listen(port);
  console.log(`Nest app is running on local port: http://localhost:${port}`);
  console.log();
  console.log(
    `You should see the Swagger UI: http://localhost:3000/nest-api-swagger`,
  );
  console.log();
  console.log(
    `You should see the Swagger JSON: http://localhost:3000/nest-api-swagger/json`,
  );
}

bootstrap();
