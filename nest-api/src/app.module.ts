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
import { FileModule } from './routes/file/file.module';
import { UserService } from './routes/user/user.service';
import { PriceService } from './routes/price/price.service';
import { UserController } from './routes/user/user.controller';
import { PriceController } from './routes/price/price.controller';
import { ScooterController } from './routes/scooter/scooter.controller';
import { AccessoryController } from './routes/accessory/accessory.controller';
import { OrderController } from './routes/order/order.controller';
import { ScooterService } from './routes/scooter/scooter.service';
import { AccessoryService } from './routes/accessory/accessory.service';
import { OrderService } from './routes/order/order.service';
import { Chat } from './gateways/chat';
import { JsonController } from './routes/file/json/json.controller';

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
          ttl: 60_000,
          limit: 20,
          blockDuration: 600_000,
        },
      ],
    }),
    FileModule,
  ],
  controllers: [
    AppHello,
    UserController,
    PriceController,
    ScooterController,
    AccessoryController,
    OrderController,
  ],
  providers: [
    // { provide: APP_GUARD, useClass: AuthGuard }, // already included with useGlobalGuards in main.ts
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    UserService,
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
      .forRoutes(AccessoryController, JsonController, UserController);
    // .forRoutes({ path: 'price/*', method: RequestMethod.GET });
  }
}
