import { DataSource } from 'typeorm';
import { User } from '../entities/user';
import { UserDetails } from '../entities/user.details';

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
