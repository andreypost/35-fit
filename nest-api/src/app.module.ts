import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './db/database.module';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { HelloController } from './hello.controller';
import { DetailController } from './file/detail.controller';
import { AuthController } from './user/auth.controller';
import { userProviders, userDetailsProviders } from './user/auth.provider';
import { AppService } from './app.service';
import { AuthService } from './user/auth.service';
import { DetailService } from './file/detail.service';
import 'reflect-metadata';
import { secrets } from './constants/secrets';
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
      signOptions: { expiresIn: '3600000s' },
    }),
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
