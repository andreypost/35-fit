import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { BaseSchema } from './base.schema';
import { User } from './user';

@Entity('user_image')
export class UserImage extends BaseSchema {
  @PrimaryGeneratedColumn('uuid', { name: 'user_image_id' })
  id!: string;

  @ManyToOne(() => User, (user) => user.images, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  @Index('idx_user_image_user_id')
  user!: User;

  @RelationId((ui: UserImage) => ui.user)
  userId!: string;

  @Column({ name: 'image_url' })
  imageUrl!: string;

  @Column({ name: 'display_order', default: 0 })
  displayOrder!: number;

  @Column({ name: 'mime_type' })
  mimeType!: string;
}
