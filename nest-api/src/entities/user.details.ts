import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'userDetails' })
export class UserDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  earnings: string;

  @Column()
  country: string;

  @Column()
  name: string;
}
