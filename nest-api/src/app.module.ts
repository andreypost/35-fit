import 'reflect-metadata';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataBaseModule } from './db/database.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { config } from 'dotenv';
import { AuthGuard } from './auth/auth.guard';
import { secrets } from './constants/secrets';
import { UserService } from './routes/user/user.service';
import { DetailService } from './routes/file/detail.service';
import { PriceService } from './routes/price/price.service';
import { UserController } from './routes/user/user.controller';
import { DetailController } from './routes/file/detail.controller';
import { PriceController } from './routes/price/price.controller';
import { ScooterController } from './routes/scooter/scooter.controller';
import { AccessoryController } from './routes/accessory/accessory.controller';
import { OrderController } from './routes/order/order.controller';
import { ScooterService } from './routes/scooter/scooter.service';
import { AccessoryService } from './routes/accessory/accessory.service';
import { OrderService } from './routes/order/order.service';

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
    UserController,
    DetailController,
    PriceController,
    ScooterController,
    AccessoryController,
    OrderController,
  ],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    UserService,
    DetailService,
    PriceService,
    ScooterService,
    AccessoryService,
    OrderService,
  ],
})
export class AppModule {}
