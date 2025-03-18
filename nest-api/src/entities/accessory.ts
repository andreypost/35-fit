import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseSchema } from './base.schema';
import { Price } from './price';

@Entity({ name: 'accessory' })
export class Accessory extends BaseSchema {
  @Column()
  name!: string;

  // Each Accessory has a unique pricing model, the price is not intended to be reused across multiple accessory.
  // @OneToOne(() => Price, ({ accessory }) => accessory, { eager: true }) // { eager: true } - unnecessary automatic joins, instead, relations can be loaded when needed using relations: ["price"]
  // price!: Price;

  @ManyToOne(() => Price, (price) => price.accessories, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'price_id' }) // Without @JoinColumn(), TypeORM would generate a default column name based on price
  price!: Price;
}
