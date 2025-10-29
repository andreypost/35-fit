import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  mySQLDataBaseOptions,
  MySQLDataBaseSource,
  postgreSQLDataBaseOptions,
  PostgreSQLDataBaseSource,
} from './database.source';
import { User } from '../entities/user';
import { Price } from '../entities/price';
import { Scooter } from '../entities/scooter';
import { Order } from '../entities/order';
import { OrderItem } from '../entities/order.item';
import { Accessory } from '../entities/accessory';
import { UserImage } from '../entities/user.image';

@Module({
  imports: [
    TypeOrmModule.forRoot(postgreSQLDataBaseOptions as any),
    TypeOrmModule.forFeature(
      [User, Price, Scooter, Accessory, OrderItem, Order, UserImage],
      PostgreSQLDataBaseSource,
    ),
    TypeOrmModule.forRoot(mySQLDataBaseOptions as any),
    TypeOrmModule.forFeature([User], MySQLDataBaseSource),
  ],
  exports: [TypeOrmModule],
})
export class DataBaseModule {}
