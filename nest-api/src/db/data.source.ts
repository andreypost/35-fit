import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { User, UserDetails } from '../entities/user';
import { config } from 'dotenv';

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
  entities: [User, UserDetails],
  migrations:
    process.env.NODE_ENV === 'production' ? [] : ['src/db/migrations/**/*.ts'],
});
