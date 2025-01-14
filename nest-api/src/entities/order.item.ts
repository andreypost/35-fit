import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order';
import { Price } from './price';

@Entity({ name: 'order_item' })
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('int')
  quantity!: number;

  @ManyToOne(() => Order, ({ items }) => items, { onDelete: 'CASCADE' })
  order!: Order;

  @ManyToOne(() => Price, { eager: true })
  price!: Price;
}
