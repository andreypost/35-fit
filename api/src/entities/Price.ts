import { Entity, Column, OneToMany } from "typeorm";
import { BaseSchema } from "./BaseSchema";
import { Scooter } from "./Scooter";
import { Accessory } from "./Accessory";

@Entity({ name: "price" })
export class Price extends BaseSchema {
  @Column()
  name!: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  amount!: number;

  @Column({ type: "decimal", precision: 5, scale: 2, default: 0 })
  discount: number = 0;

  @Column({ type: "decimal", precision: 5, scale: 2, default: 0 })
  taxRate: number = 0;

  @Column()
  currency!: string;

  @Column()
  productType!: string; // 'scooter' or 'accessory'

  // Each Scooter has a unique pricing model, the price is not intended to be reused across multiple scooters.
  // @OneToOne(() => Scooter, ({ priceId }) => priceId, { nullable: true })
  // @JoinColumn()
  // scooter?: Scooter;

  @OneToMany(() => Scooter, (scooter) => scooter.price, {
    cascade: ["insert", "update"],
    orphanedRowAction: "soft-delete", // Match BaseSchema pattern
  })
  scooters?: Scooter[];

  // Each Accessory has a unique pricing model, the price is not intended to be reused across multiple accessory.
  // @OneToOne(() => Accessory, ({ priceId }) => priceId, { nullable: true })
  // @JoinColumn()
  // accessory?: Accessory;

  @OneToMany(() => Accessory, (accessory) => accessory.price, {
    cascade: ["insert", "update"],
    orphanedRowAction: "soft-delete", // Match BaseSchema pattern
  })
  accessories?: Accessory[];
}
