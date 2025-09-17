import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { BaseSchema } from "./BaseSchema";
import { User } from "./User";
import { OrderItem } from "./OrderItem";

@Entity({ name: "order" })
export class Order extends BaseSchema {
  @PrimaryGeneratedColumn("uuid", { name: "order_id" })
  id!: string;

  @Column()
  status!: string; // 'pending', 'shipped', 'delivered', 'cancelled'

  @ManyToOne(() => User, (user) => user.orders, {
    nullable: false,
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  @Index("idx_order_user_id")
  user!: User;

  @RelationId((o: Order) => o.user)
  userId!: string;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    cascade: ["insert", "update"],
    orphanedRowAction: "soft-delete",
  })
  items!: OrderItem[];

  @Column("decimal", { name: "final_total_price", precision: 10, scale: 2 })
  finalTotalPrice!: number;

  calculateFinalTotalPrice() {
    this.finalTotalPrice = this.items.reduce((total, { price, quantity }) => {
      const { amount, discount, taxRate } = price;
      const priceAfterDiscount = amount - (amount * discount) / 100;
      const priceAfterTaxRate =
        priceAfterDiscount + (priceAfterDiscount * taxRate) / 100;
      return Math.round((total + priceAfterTaxRate * quantity) * 100) / 100;
    }, 0);
  }
}
