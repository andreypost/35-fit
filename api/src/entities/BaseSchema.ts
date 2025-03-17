import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export abstract class BaseSchema {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @CreateDateColumn()
  readonly createdAt!: Date;

  @UpdateDateColumn()
  readonly updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date; // Stores the timestamp when the row is "soft deleted"
}
