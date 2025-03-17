import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
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

  @ManyToOne(() => Order, (order) => order.items, { onDelete: "CASCADE" })
  @JoinColumn({ name: "order_id" })
  order!: Order;

  @ManyToOne(() => Price, { eager: true })
  price!: Price;
}
