import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user';
import { Scooter } from './scooter';

@Entity({ name: 'order' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('int')
  quantity!: number;

  @Column()
  status!: string; // 'pending', 'shipped', 'delivered', 'cancelled'

  @Column('decimal', { precision: 10, scale: 2 })
  finalTotalPrice!: number;

  @ManyToOne(() => User, ({ orders }) => orders, {
    // The database will throw an error if you try to delete a User with existing orders
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    // onDelete: 'CASCADE',
    // onUpdate: 'CASCADE',
  })
  user?: User; // Automatically creates a `userId` foreign key

  @ManyToMany(() => Scooter, ({ orders }) => orders)
  scooters!: Scooter[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
