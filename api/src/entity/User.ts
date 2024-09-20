import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import bcrypt from "bcrypt";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id?: number;

  @Column()
  name!: string;

  @Column()
  surname!: string;

  @Column({ default: "Non-binary" })
  gender!: string;

  @Column()
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
  async hashPassword() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  async checkPassword(inputPassword: string): Promise<boolean> {
    return bcrypt.compare(inputPassword, this.password);
  }
  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
