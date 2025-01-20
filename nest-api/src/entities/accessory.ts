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

@Entity({ name: 'accessory' })
export class Accessory {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name!: string;

  // Each Accessory has a unique pricing model, the price is not intended to be reused across multiple accessory.
  // @OneToOne(() => Price, ({ accessory }) => accessory, { eager: true })
  // priceId!: Price;

  @ManyToOne(() => Price, ({ accessory }) => accessory, { eager: true })
  priceId!: Price;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
