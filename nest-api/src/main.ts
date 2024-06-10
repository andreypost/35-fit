import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // app.enableCors({
  //   origin: [
  //     process.env.HEADLESS_URL,
  //     'https://fit-35.web.app',
  //     'https://fit-35.web.app/#/',
  //   ],
  //   optionsSuccessStatus: 200,
  //   methods: 'GET, POST, PUT, HEAD, PATCH, DELETE',
  //   credentials: true,
  // });
  await app.listen(process.env.PORT || 3000);
  console.log(`Nest app is running on local port: http://localhost:3000/`);
}
bootstrap();
