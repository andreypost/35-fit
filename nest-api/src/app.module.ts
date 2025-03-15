import 'reflect-metadata';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataBaseModule } from './db/database.module';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { config } from 'dotenv';
import { AuditLoggerMiddleware } from './middlewares/audit.logger';
import { AuthGuard } from './guards/auth.guard';
import { secrets } from './constants/secrets';
import { AppHello } from './app.hello';
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
import { Chat } from './gateways/chat';

config();

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'docker' ? '.env.docker' : '.env.local',
      isGlobal: true,
    }),
    DataBaseModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: secrets.EXPIRES_IN },
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 6000,
          limit: 3,
          blockDuration: 600000,
        },
      ],
    }),
  ],
  controllers: [
    AppHello,
    UserController,
    DetailController,
    PriceController,
    ScooterController,
    AccessoryController,
    OrderController,
  ],
  providers: [
    // { provide: APP_GUARD, useClass: AuthGuard }, // already included with useGlobalGuards in main.ts
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    UserService,
    DetailService,
    PriceService,
    ScooterService,
    AccessoryService,
    OrderService,
    Chat,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuditLoggerMiddleware)
      // .exclude({ path: 'price/check', method: RequestMethod.GET })
      .forRoutes(AccessoryController);
    // .forRoutes('accessory', 'file', 'order', 'price', 'scooter', 'user');
    // .forRoutes({ path: 'price/*', method: RequestMethod.GET });
  }
}
