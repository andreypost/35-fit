import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataBaseOptions } from './database.source';
import { User } from '../entities/user';
import { Price } from '../entities/price';
import { Scooter } from '../entities/scooter';
import { Order } from '../entities/order';
import { OrderItem } from '../entities/order.item';
import { Accessory } from '../entities/accessory';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataBaseOptions as any),
    TypeOrmModule.forFeature([
      User,
      Price,
      Scooter,
      Accessory,
      OrderItem,
      Order,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class DataBaseModule {}
