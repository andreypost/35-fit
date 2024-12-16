import { Provider } from '@nestjs/common';
import { AppDataSource } from './data.source';
import { DataSource } from 'typeorm';
import { nextError } from '../helpers/next.error';
import { User } from '../entities/user';
import { UserDetails } from '../entities/user.details';
import { Order } from '../entities/order';

export const databaseProviders: Provider[] = [
  {
    provide: DataSource,
    useFactory: async () => {
      try {
        return await AppDataSource.initialize();
      } catch (error: any) {
        nextError(error);
      }
    },
  },
  {
    provide: 'USER_REPOSITORY',
    useFactory: async (dataSource: DataSource) =>
      dataSource.getRepository(User),
    inject: [DataSource],
  },
  {
    provide: 'USER_DETAILS_REPOSITORY',
    useFactory: async (dataSource: DataSource) =>
      dataSource.getRepository(UserDetails),
    inject: [DataSource],
  },
  {
    provide: 'ORDER_REPOSITORY',
    useFactory: async (dataSource: DataSource) =>
      dataSource.getRepository(Order),
    inject: [DataSource],
  },
];
