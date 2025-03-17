import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseSchema } from "./BaseSchema";
import { User } from "./User";
import { OrderItem } from "./OrderItem";

@Entity({ name: "order" })
export class Order extends BaseSchema {
  @Column()
  status!: string; // 'pending', 'shipped', 'delivered', 'cancelled'

  @ManyToOne(() => User, (user) => user.orders, {
    // The database will throw an error if you try to delete a User with existing orders
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "user_id" }) // Explicitly define the foreign key column
  user!: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    cascade: ["insert", "update"],
  })
  items!: OrderItem[];

  @Column("decimal", { precision: 10, scale: 2 })
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
