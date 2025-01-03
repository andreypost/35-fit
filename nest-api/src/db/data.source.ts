import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from '../entities/user';
import { Order } from '../entities/order';
// import { Scooter } from '../entities/scooter';

config(); // strongly required for migrations

const configService = new ConfigService();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get<string>('PGHOST'),
  port: +configService.get<string>('PGPORT'),
  username: configService.get<string>('PGUSER'),
  password: configService.get<string>('PGPASSWORD'),
  database: configService.get<string>('PGDATABASE'),
  synchronize: false,
  logging: true,
  entities: [User, Order],
  // migrations:
  //   process.env.NODE_ENV === 'production'
  //     ? []
  //     : ['dist/src/db/migrations/**/*.js'],
  migrations: ['dist/src/db/migrations/**/*.js'],
  // migrationsRun: true, // triggers migrations just after start the project, after creating new migrations and so on
});
