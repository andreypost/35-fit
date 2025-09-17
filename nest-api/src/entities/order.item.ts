import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { BaseSchema } from './base.schema';
import { Order } from './order';
import { Price } from './price';

@Entity({ name: 'order_item' })
export class OrderItem extends BaseSchema {
  @PrimaryGeneratedColumn('uuid', { name: 'order_item_id' })
  id!: string;

  @Column({ name: 'product_name' })
  productName!: string;

  @Column('int')
  quantity!: number;

  @Column({ name: 'product_type' })
  productType!: string;

  @Column('uuid', { name: 'product_id' })
  productId!: string; // UUID of the scooter or accessory

  @ManyToOne(() => Order, (order) => order.items, {
    nullable: false,
    // NO ACTION means: DB will block deleting an Order that still has items.
    // If you want DB-level cascade deletes, change to 'CASCADE'.
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  @Index('idx_order_item_order_id')
  order!: Order;

  @RelationId((oi: OrderItem) => oi.order)
  orderId!: string;

  @ManyToOne(() => Price, {
    eager: true,
    nullable: false,
    // RESTRICT/NO ACTION both prevent deleting a Price that's in use.
    // Use CASCADE only if deleting a price should nuke all related order items.
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'price_id' })
  @Index('idx_order_item_price_id')
  price!: Price;

  @RelationId((oi: OrderItem) => oi.price)
  priceId!: string;
}
