import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, UserDetails } from './entities/user';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloController } from './hello.controller';
import { AuthController } from './user/auth.controller';
import { AuthService } from './user/auth.service';

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
        entities: [User, UserDetails],
        synchronize: Boolean(
          configService.get<string>('NODE_ENV') === 'development',
        ),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, UserDetails]),
  ],
  controllers: [AppController, HelloController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
