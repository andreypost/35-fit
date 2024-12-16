import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user';

@Entity({ name: 'order' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('int')
  totalAmount!: number;

  @Column()
  status!: string; // 'Pending', 'Shipped', 'Delivered', 'Cancelled'

  @ManyToOne(() => User, (user) => user.orders, { onDelete: 'CASCADE' })
  user!: User; // Automatically creates a `userId` foreign key

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at!: Date;
}
