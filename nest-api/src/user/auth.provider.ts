import { DataSource } from 'typeorm';
import { User, UserDetails } from '../entities/user';

export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];

export const userDetailsProviders = [
  {
    provide: 'USER_DETAILS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserDetails),
    inject: ['DATA_SOURCE'],
  },
];
