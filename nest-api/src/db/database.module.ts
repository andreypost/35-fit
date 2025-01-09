import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataBaseOptions } from './database.source';
import { Order } from '../entities/order';
import { User } from '../entities/user';
import { Scooter } from 'src/entities/scooter';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataBaseOptions as any),
    TypeOrmModule.forFeature([User, Order, Scooter, Order]),
  ],
  exports: [TypeOrmModule],
})
export class DataBaseModule {}
