import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { BaseSchema } from "./BaseSchema";
import { Order } from "./Order";
import { Price } from "./Price";

@Entity({ name: "order_item" })
export class OrderItem extends BaseSchema {
  @Column()
  productName!: string;

  @Column("int")
  quantity!: number;

  @Column()
  productType!: string;

  @Column("uuid")
  productId!: string; // UUID of the scooter or accessory

  @ManyToOne(() => Order, (order) => order.items, {
    nullable: false,
    onDelete: "NO ACTION", // Disable DB-level cascade (let TypeORM handle soft-delete)
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "order_id" })
  @Index()
  order!: Order;

  @ManyToOne(() => Price, { eager: true })
  price!: Price;
}
