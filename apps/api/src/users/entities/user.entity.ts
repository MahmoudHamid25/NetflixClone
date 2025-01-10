import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

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
  @ApiProperty({
    description: 'Unique identifier for the user',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'User’s social ID (if applicable)',
    nullable: true,
  })
  @Column({ nullable: true, unique: true })
  socialId: string;

  @ApiProperty({
    description: 'Profile icon URL',
    example: 'https://example.com/avatar.png',
  })
  @Column({
    nullable: false,
    default:
      'https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper.png',
  })
  profileIcon: string;

  @ApiProperty({ description: 'Username of the user', example: 'JohnDoe' })
  @Column({ nullable: false })
  username: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'user@example.com',
  })
  @Column({ type: 'varchar' })
  email: string;

  @ApiProperty({
    description: 'Number of login attempts',
    example: 0,
    default: 0,
  })
  @Column({ type: 'integer', default: 0 })
  login_attempts: number;

  @ApiProperty({
    description: 'Current account status',
    example: AccountStatus.ACTIVE,
    enum: AccountStatus,
    default: AccountStatus.INACTIVE,
  })
  @Column({
    type: 'varchar',
    default: AccountStatus.INACTIVE,
    enum: AccountStatus,
  })
  account_status: AccountStatus;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2023-01-01T00:00:00.000Z',
  })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ApiProperty({
    description: 'Last modified timestamp',
    example: '2023-01-01T00:00:00.000Z',
  })
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  modified_at: Date;

  @ApiProperty({
    description: 'Refresh token (used for authentication)',
    nullable: true,
    example: 'some-refresh-token',
  })
  @Column({ nullable: true })
  refreshToken: string;

  @ApiProperty({
    description: 'User password (optional). For internal use only.',
    nullable: true,
    writeOnly: true,
    example: 'secure-password',
  })
  @Column({ type: 'varchar', nullable: true })
  password?: string;
}
