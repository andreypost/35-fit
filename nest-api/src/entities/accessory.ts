import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { BaseSchema } from './base.schema';
import { Price } from './price';

@Entity({ name: 'accessory' })
export class Accessory extends BaseSchema {
  @PrimaryGeneratedColumn('uuid', { name: 'accessory_id' })
  id!: string;

  @Column()
  name!: string;

  @ManyToOne(() => Price, (price) => price.accessories, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'price_id' })
  @Index('idx_accessory_price_id')
  price!: Price;

  @RelationId((a: Accessory) => a.price)
  priceId!: string
}
