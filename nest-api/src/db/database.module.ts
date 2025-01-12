import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataBaseOptions } from './database.source';
import { User } from '../entities/user';
import { Price } from '../entities/price';
import { Order } from '../entities/order';
import { Scooter } from '../entities/scooter';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataBaseOptions as any),
    TypeOrmModule.forFeature([User, Price, Order, Scooter]),
  ],
  exports: [TypeOrmModule],
})
export class DataBaseModule {}
