import 'reflect-metadata';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { config } from 'dotenv';
import { DatabaseModule } from './db/database.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { secrets } from './constants/secrets';
import { AppController } from './app.controller';
import { HelloController } from './hello.controller';
import { DetailController } from './file/detail.controller';
import { UserController } from './user/user.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { DetailService } from './file/detail.service';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';

config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: secrets.EXPIRES_IN },
    }),
  ],
  controllers: [
    AppController,
    HelloController,
    UserController,
    DetailController,
    OrderController,
  ],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    AppService,
    UserService,
    DetailService,
    OrderService,
  ],
})
export class AppModule {}
