import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order';

@Entity({ name: 'scooter' })
export class Scooter {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  rentalPricePerDay: number;

  @Column()
  brand: string;

  @Column({ default: true })
  isAvaiable: boolean;

  @Column({ default: 'sale' }) // sale or rental
  saleType: string;

  @Column({ nullable: true })
  description: string;
}
