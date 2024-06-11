import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { AppController } from './app.controller';
import { HelloController } from './hello.controller';
import { UserController } from './user/user.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';

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
  controllers: [AppController, HelloController, UserController],
  providers: [AppService, UserService],
})
// @Module({
//   imports: [
//     ConfigModule.forRoot(),
//     TypeOrmModule.forRoot({
//       type: 'postgres',
//       host: process.env.PGHOST,
//       port: parseInt(process.env.PGPORT, 10),
//       username: process.env.PGUSER,
//       password: process.env.PGPASSWORD,
//       database: process.env.PGDATABASE,
//       entities: [User],
//       synchronize: false, // Set to false in production
//       // synchronize: true, // Set to true in development
//     }),
//     TypeOrmModule.forFeature([User]),
//   ],
//   controllers: [AppController, HelloController, UserController],
//   providers: [AppService, UserService],
// })
export class AppModule {}
// console.log('process.env: ', process.env);
