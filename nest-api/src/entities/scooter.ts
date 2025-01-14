import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
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

  @OneToOne(() => Price, ({ scooter }) => scooter, { eager: true })
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
