import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user';
import { OrderItem } from './order.item';

@Entity({ name: 'order' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  status!: string; // 'pending', 'shipped', 'delivered', 'cancelled'

  @ManyToOne(() => User, ({ orders }) => orders, {
    // The database will throw an error if you try to delete a User with existing orders
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    // onDelete: 'CASCADE',
    // onUpdate: 'CASCADE',
  })
  user!: User; // Automatically creates a `userId` foreign key

  @OneToMany(() => OrderItem, ({ order }) => order, { cascade: true })
  items!: OrderItem[];

  @Column('decimal', { precision: 10, scale: 2 })
  finalTotalPrice!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  calculateFinalTotalPrice() {
    this.finalTotalPrice = this.items.reduce((total, { price, quantity }) => {
      const { amount, discount, taxRate } = price;
      const priceAfterDiscount = amount - (amount * discount) / 100;
      const priceAfterTaxRate =
        priceAfterDiscount + (priceAfterDiscount * taxRate) / 100;
      return Math.round((total + priceAfterTaxRate * quantity) * 100) / 100;
    }, 0);
  }
}
