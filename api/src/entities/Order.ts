import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity({ name: "order" })
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column("int")
  orderQuantity!: number;

  @Column()
  status!: string; // 'Pending', 'Shipped', 'Delivered', 'Cancelled'

  @Column("decimal", { precision: 10, scale: 2 })
  totalCost!: number;

  @ManyToOne(() => User, (user) => user.orders, { onDelete: "CASCADE" })
  user!: User; // Automatically creates a `userId` foreign key

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
