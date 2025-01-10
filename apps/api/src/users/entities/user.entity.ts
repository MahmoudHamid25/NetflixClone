import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum AccountStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING = 'pending',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired',
  BANNED = 'banned',
  ON_TRIAL = 'onTrial',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, unique: true })
  socialId: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  password?: string;

  @Column({ type: 'integer', default: 0 })
  login_attempts: number;

  @Column({
    type: 'varchar',
    default: AccountStatus.INACTIVE,
    enum: AccountStatus,
  })
  account_status: AccountStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  modified_at: Date;

  @Column({ nullable: true })
  refreshToken: string;
}
