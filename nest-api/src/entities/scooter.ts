import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseSchema } from './base.schema';
import { Price } from './price';

@Entity({ name: 'scooter' })
export class Scooter extends BaseSchema {
  @Column()
  model!: string;

  // Each Scooter has a unique pricing model, the price is not intended to be reused across multiple scooters.
  // @OneToOne(() => Price, ({ scooter }) => scooter, { eager: true }) // { eager: true } - unnecessary automatic joins, instead, relations can be loaded when needed using relations: ["price"]
  // price!: Price;

  @ManyToOne(() => Price, (price) => price.scooters, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'price_id' }) // Without @JoinColumn(), TypeORM would generate a default column name based on price
  price?: Price;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  rentalPricePerDay?: number;

  @Column({ default: 'sale' }) // sale or rental
  saleType?: string;
}
