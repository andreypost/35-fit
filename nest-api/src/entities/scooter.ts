import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  // OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Price } from './price';

@Entity({ name: 'scooter' })
export class Scooter {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  model!: string;

  // Each Scooter has a unique pricing model, the price is not intended to be reused across multiple scooters.
  // @OneToOne(() => Price, ({ scooter }) => scooter, { eager: true })
  // priceId!: Price;

  @ManyToOne(() => Price, ({ scooter }) => scooter, { eager: true })
  priceId!: Price;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  rentalPricePerDay?: number;

  @Column({ default: 'sale' }) // sale or rental
  saleType: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
