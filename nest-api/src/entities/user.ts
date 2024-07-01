import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}

@Entity({ name: 'UserDetails' })
export class UserDetails {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  earnings: string;

  @Column()
  country: string;

  @Column()
  name: string;
}
