import 'reflect-metadata';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataBaseModule } from './db/database.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { config } from 'dotenv';
import { AuthGuard } from './auth/auth.guard';
import { secrets } from './constants/secrets';
import { AppController } from './app.controller';
import { HelloController } from './hello.controller';
import { DetailController } from './routes/file/detail.controller';
import { UserController } from './routes/user/user.controller';
import { AppService } from './app.service';
import { UserService } from './routes/user/user.service';
import { DetailService } from './routes/file/detail.service';
import { PriceController } from './routes/price/price.controller';
import { PriceService } from './routes/price/price.service';
import { OrderController } from './routes/order/order.controller';
import { OrderService } from './routes/order/order.service';
import { ScooterController } from './routes/scooter/scooter.controller';
import { ScooterService } from './routes/scooter/scooter.service';

config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DataBaseModule,
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
    PriceController,
    ScooterController,
    OrderController,
  ],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    AppService,
    UserService,
    DetailService,
    PriceService,
    ScooterService,
    OrderService,
  ],
})
export class AppModule {}
