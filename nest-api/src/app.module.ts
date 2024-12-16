import 'reflect-metadata';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './db/database.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { secrets } from './constants/secrets';
import { AppController } from './app.controller';
import { HelloController } from './hello.controller';
import { DetailController } from './file/detail.controller';
import { AuthController } from './user/auth.controller';
import { AppService } from './app.service';
import { AuthService } from './user/auth.service';
import { DetailService } from './file/detail.service';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { dataSourceOptions, AppDataSource } from './db/dataSource';
// import { User, UserDetails } from './entities/user';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: secrets.JWT_KEY,
      signOptions: { expiresIn: secrets.EXPIRES_IN },
    }),
  ],
  controllers: [
    AppController,
    HelloController,
    AuthController,
    DetailController,
    OrderController,
  ],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    AppService,
    AuthService,
    DetailService,
    OrderService,
  ],
})
export class AppModule {}

/*
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...dataSourceOptions,
        autoLoadEntities: true,
      }),
    }),
    TypeOrmModule.forFeature([User, UserDetails]),
  ],
  controllers: [
    AppController,
    HelloController,
    AuthController,
    DetailController,
  ],
  providers: [
    AppService,
    AuthService,
    DetailService,
  ],
})
*/
