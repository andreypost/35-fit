import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloController } from './hello.controller';
import { AuthController } from './user/auth.controller';
import { AuthService } from './user/auth.service';
import { DetailsController } from './user/details.controller';
import { DetailsService } from './user/details.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('PGHOST'),
        port: parseInt(configService.get<string>('PGPORT'), 10),
        username: configService.get<string>('PGUSER'),
        password: configService.get<string>('PGPASSWORD'),
        database: configService.get<string>('PGDATABASE'),
        entities: [User],
        synchronize: Boolean(
          configService.get<string>('NODE_ENV') === 'development',
        ),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [
    AppController,
    HelloController,
    AuthController,
    DetailsController,
  ],
  providers: [AppService, AuthService, DetailsService],
})
export class AppModule {}
