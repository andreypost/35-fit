import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HelloController } from './hello.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { User } from './user/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PGHOST,
      port: parseInt(process.env.PGPORT, 10),
      username: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      entities: [User],
      synchronize: false, // Set to false in production
      // synchronize: true, // Set to true in development
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController, HelloController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
