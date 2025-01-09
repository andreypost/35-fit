import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Scooter } from './scooter';

@Entity({ name: 'price' })
export class Price {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount!: number;

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  discount: number;

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  taxRate: number;

  @Column({ default: 'USD' })
  currency: string;

  @OneToOne(() => Scooter, ({ price }) => price)
  scooter!: Scooter;
}
