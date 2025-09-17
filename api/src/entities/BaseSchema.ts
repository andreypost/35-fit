import {
  CreateDateColumn,
  DeleteDateColumn,
  Index,
  UpdateDateColumn,
} from "typeorm";

export abstract class BaseSchema {
  // @PrimaryGeneratedColumn('uuid')
  // id!: string;

  @CreateDateColumn({ name: "created_at", update: false }) // Explicitly non-updatable
  readonly createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", nullable: true }) // Allow null before first update
  readonly updatedAt!: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  @Index()
  deletedAt?: Date; // Stores the timestamp when the row is "soft deleted"
}
