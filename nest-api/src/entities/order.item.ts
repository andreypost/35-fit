import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseSchema } from './base.schema';
import { Order } from './order';
import { Price } from './price';

@Entity({ name: 'order_item' })
export class OrderItem extends BaseSchema {
  @Column()
  productName!: string;

  @Column('int')
  quantity!: number;

  @Column()
  productType!: string;

  @Column('uuid')
  productId!: string; // UUID of the scooter or accessory

  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order!: Order;

  @ManyToOne(() => Price, { eager: true })
  price!: Price;
}
