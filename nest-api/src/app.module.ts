import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HelloController } from './hello.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, HelloController],
  providers: [AppService],
})
export class AppModule {}
