import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Scooter } from './scooter';
import { Accessory } from './accessory';

@Entity({ name: 'price' })
export class Price {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount!: number;

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  discount: number = 0;

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  taxRate: number = 0;

  @Column()
  currency!: string;

  @Column()
  productType!: string; // 'scooter' or 'accessory'

  @OneToOne(() => Scooter, ({ priceId }) => priceId, { nullable: true })
  @JoinColumn()
  scooter?: Scooter;

  @OneToOne(() => Accessory, ({ priceId }) => priceId, { nullable: true })
  @JoinColumn()
  accessory?: Accessory;
}
