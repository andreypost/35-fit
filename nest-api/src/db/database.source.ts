import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { User } from '../entities/user';
import { Price } from '../entities/price';
import { Scooter } from '../entities/scooter';
import { Accessory } from '../entities/accessory';
import { OrderItem } from '../entities/order.item';
import { Order } from '../entities/order';

config(); // strongly required for migrations

const configService = new ConfigService();

export const dataBaseOptions = {
  type: 'postgres',
  host: configService.get<string>('PGHOST'),
  port: Number(configService.get<string>('PGPORT')),
  username: configService.get<string>('PGUSER'),
  password: configService.get<string>('PGPASSWORD'),
  database: configService.get<string>('PGDATABASE'),
  synchronize: false,
  logging: true,
  entities: [User, Price, Scooter, Accessory, OrderItem, Order],
  // migrations:
  //   process.env.NODE_ENV === 'production'
  //     ? []
  //     : ['dist/src/db/migrations/**/*.js'],
  migrations: ['dist/src/db/migrations/**/*.js'],
  // migrationsRun: true, // triggers migrations just after start the project, after creating new migrations and so on
};

export const DataBaseSource = new DataSource(dataBaseOptions as any);
