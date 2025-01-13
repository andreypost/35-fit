import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from './order';
import { Price } from './price';

@Entity({ name: 'scooter' })
export class Scooter {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  model!: string;

  @OneToOne(() => Price, ({ scooter }) => scooter, { eager: true })
  @JoinColumn()
  price!: Price;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  rentalPricePerDay?: number;

  @Column({ default: 'sale' }) // sale or rental
  saleType: string;

  @ManyToMany(() => Order, ({ scooters }) => scooters)
  orders!: Order[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
