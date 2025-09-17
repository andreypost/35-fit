import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { BaseSchema } from "./BaseSchema";
import { Price } from "./Price";

@Entity({ name: "scooter" })
export class Scooter extends BaseSchema {
  @PrimaryGeneratedColumn("uuid", { name: "scooter_id" })
  id!: string;

  @Column()
  model!: string;

  // Each Scooter has a unique pricing model, the price is not intended to be reused across multiple scooters.
  // @OneToOne(() => Price, ({ scooter }) => scooter, { eager: true }) // { eager: true } - unnecessary automatic joins, instead, relations can be loaded when needed using relations: ["price"]
  // price!: Price;

  @ManyToOne(() => Price, (price) => price.scooters, {
    nullable: false,
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "price_id" })
  @Index("idx_scooter_price_id")
  price!: Price;

  @RelationId((s: Scooter) => s.price)
  priceId!: string;

  @Column("decimal", {
    name: "rental_price_per_day",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  rentalPricePerDay?: number;

  @Column({ default: "sale" }) // sale or rental
  saleType?: string;
}
