import {
  Entity,
  Column,
  BeforeInsert,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseSchema } from './base.schema';
import { Transform } from 'class-transformer';
import bcrypt from 'bcrypt';
import { Order } from './order';
import { UserPrivileges } from '../utils/user.roles';
import { UserImage } from './user.image';

@Entity({ name: 'user' })
export class User extends BaseSchema {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  id!: string;

  @Column()
  name!: string;

  @Column()
  surname!: string;

  @Column()
  gender!: string;

  @Column()
  @Transform(({ value }) => Number(value))
  age!: number;

  @Column()
  country!: string;

  @Column()
  city!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  phone!: string;

  @Column({ name: 'emergency_name' })
  emergencyName?: string;

  @Column({ name: 'emergency_phone' })
  emergencyPhone?: string;

  @Column({
    name: 'granted_privileges',
    type: 'int',
    default: UserPrivileges.None,
  })
  grantedPrivileges!: number;

  @Column({
    name: 'denied_privileges',
    type: 'int',
    default: UserPrivileges.None,
  })
  deniedPrivileges!: number;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  async checkPassword(inputPassword: string): Promise<boolean> {
    return bcrypt.compare(inputPassword, this.password);
  }

  @OneToMany(() => Order, (order) => order.user, {
    cascade: ['insert', 'update'],
    orphanedRowAction: 'soft-delete',
  })
  orders!: Order[];

  @OneToMany(() => UserImage, (image) => image.user, {
    cascade: ['insert', 'update'],
    orphanedRowAction: 'soft-delete',
  })
  images!: UserImage[];
}
