import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './db/database.module';
import { AppController } from './app.controller';
import { HelloController } from './hello.controller';
import { DetailController } from './user/detail.controller';
import { AuthController } from './user/auth.controller';
import { userProviders, userDetailsProviders } from './user/auth.provider';
import { AppService } from './app.service';
import { AuthService } from './user/auth.service';
import { DetailService } from './user/detail.service';
import 'reflect-metadata';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { dataSourceOptions, AppDataSource } from './db/dataSource';
// import { User, UserDetails } from './entities/user';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
  ],
  controllers: [
    AppController,
    HelloController,
    AuthController,
    DetailController,
  ],
  providers: [
    ...userProviders,
    ...userDetailsProviders,
    AppService,
    AuthService,
    DetailService,
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
