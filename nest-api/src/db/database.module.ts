import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataBaseOptions } from './database.source';
import { Order } from '../entities/order';
import { User } from '../entities/user';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataBaseOptions as any),
    TypeOrmModule.forFeature([User, Order]),
  ],
  exports: [TypeOrmModule],
})
export class DataBaseModule {}
