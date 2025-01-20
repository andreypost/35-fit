import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  // OneToOne,
  // JoinColumn,
  OneToMany,
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

  // Each Scooter has a unique pricing model, the price is not intended to be reused across multiple scooters.
  // @OneToOne(() => Scooter, ({ priceId }) => priceId, { nullable: true })
  // @JoinColumn()
  // scooter?: Scooter;

  @OneToMany(() => Scooter, ({ priceId }) => priceId, { nullable: true })
  scooter?: Scooter[];

  // Each Accessory has a unique pricing model, the price is not intended to be reused across multiple accessory.
  // @OneToOne(() => Accessory, ({ priceId }) => priceId, { nullable: true })
  // @JoinColumn()
  // accessory?: Accessory;

  @OneToMany(() => Accessory, ({ priceId }) => priceId, { nullable: true })
  accessory?: Accessory;
}
