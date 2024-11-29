import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  login_attempts: number;

  @Column()
  account_status: string;

  @Column()
  created_at: Date;

  @Column()
  modified_at: Date;
}
