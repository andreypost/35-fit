import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from '../entities/user';
import { UserDetails } from '../entities/user.details';

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
    process.env.NODE_ENV === 'production'
      ? []
      : ['dist/src/db/migrations/**/*.js'],
});
