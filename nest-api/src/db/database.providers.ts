import { Provider } from '@nestjs/common';
import { AppDataSource } from './data.source';

export const databaseProviders: Provider[] = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => AppDataSource.initialize(),
  },
];
