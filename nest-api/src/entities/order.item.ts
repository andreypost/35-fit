import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order';
import { Price } from './price';

@Entity({ name: 'order_item' })
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  productName!: string;

  @Column('int')
  quantity!: number;

  @Column()
  productType!: string;

  @Column('uuid')
  productId!: string; // UUID of the scooter or accessory

  @ManyToOne(() => Order, ({ items }) => items, { onDelete: 'CASCADE' })
  order!: Order;

  @ManyToOne(() => Price, { eager: true })
  price!: Price;
}
