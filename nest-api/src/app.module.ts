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
// import { APP_GUARD } from '@nestjs/core';
import { config } from 'dotenv';
import { AuditLoggerMiddleware } from './middlewares/audit.logger';
// import { AuthGuard } from './auth/auth.guard';
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
    // { provide: APP_GUARD, useClass: AuthGuard }, // included with useGlobalGuards in main.ts
    UserService,
    DetailService,
    PriceService,
    ScooterService,
    AccessoryService,
    OrderService,
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
