import { Entity, Column, BeforeInsert, OneToMany } from 'typeorm';
import { BaseSchema } from './base.schema';
import { Transform } from 'class-transformer';
import bcrypt from 'bcrypt';
import { Order } from './order';

@Entity({ name: 'user' })
export class User extends BaseSchema {
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

  @Column()
  emergencyName?: string;

  @Column()
  emergencyPhone?: string;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  async checkPassword(inputPassword: string): Promise<boolean> {
    return bcrypt.compare(inputPassword, this.password);
  }

  @OneToMany(() => Order, (order) => order.user)
  orders!: Order[];
}
