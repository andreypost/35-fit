import {
  CreateDateColumn,
  DeleteDateColumn,
  Index,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseSchema {
  // @PrimaryGeneratedColumn('uuid')
  // id!: string;

  @CreateDateColumn({ update: false }) // Explicitly non-updatable
  readonly createdAt!: Date;

  @UpdateDateColumn({ nullable: true }) // Allow null before first update
  readonly updatedAt!: Date;

  @DeleteDateColumn()
  @Index()
  deletedAt?: Date; // Stores the timestamp when the row is "soft deleted"
}
