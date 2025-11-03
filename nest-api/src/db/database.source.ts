import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { User } from '../entities/user';
import { Price } from '../entities/price';
import { Scooter } from '../entities/scooter';
import { Accessory } from '../entities/accessory';
import { OrderItem } from '../entities/order.item';
import { Order } from '../entities/order';
import { UserImage } from '../entities/user.image';

ConfigModule.forRoot({
  envFilePath: process.env.NODE_ENV === 'docker' ? '.env.docker' : '.env.local',
  isGlobal: true,
});

config(); // strongly required for migrations

const configService = new ConfigService();

export const postgreSQLDataBaseOptions = {
  type: 'postgres',
  host: configService.get<string>('PGHOST'),
  port: Number(configService.get<string>('PGPORT')),
  username: configService.get<string>('PGUSER'),
  password: configService.get<string>('PGPASSWORD'),
  database: configService.get<string>('PGDATABASE'),
  synchronize: false,
  logging: true,
  entities: [User, Price, Scooter, Accessory, OrderItem, Order, UserImage],
  // migrations:
  //   process.env.NODE_ENV === 'production'
  //     ? []
  //     : ['dist/src/db/migrations/**/*.js'],
  migrations: ['dist/src/db/migrations/**/*.js'],
  // migrationsRun: true, // triggers migrations just after start the project, after creating new migrations and so on
};

// export const mySQLDataBaseOptions = {
//   type: 'mysql',
//   host: configService.get<string>('MYSQL_HOST'),
//   port: Number(configService.get<string>('MYSQL_PORT')),
//   username: configService.get<string>('MYSQL_USER'),
//   password: configService.get<string>('MYSQL_PASSWORD'),
//   database: configService.get<string>('MYSQL_DATABASE'),
//   synchronize: false,
//   entities: [User, Price, Scooter, Accessory, OrderItem, Order, UserImage],
//   migrations: ['dist/src/db/mysql/migrations/**/*.js'],
// };

export const PostgreSQLDataBaseSource = new DataSource(
  postgreSQLDataBaseOptions as any,
);

// export const MySQLDataBaseSource = new DataSource(mySQLDataBaseOptions as any);
