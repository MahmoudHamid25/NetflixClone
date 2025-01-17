import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'The unique identifier of the subscription',
    example: 'a22a2f7e-c6f8-43c9-b4c5-10e77fe62a6b',
  })
  id: string;

  @Column({ type: 'varchar' })
  @ApiProperty({
    description: 'The type of the subscription',
    example: 'Premium',
  })
  type: string;

  @Column({ type: 'double precision' })
  @ApiProperty({
    description: 'The cost of the subscription',
    example: 9.99,
  })
  cost: number;

  @Column({ type: 'varchar' })
  @ApiProperty({
    description: 'The currency of the subscription cost',
    example: 'USD',
  })
  currency: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({
    description: 'The benefits of the subscription',
    example: 'Access to all movies and series.',
    nullable: true,
  })
  benefits: string;

  @ManyToOne(() => User, (user) => user.subscriptions, { nullable: false })
  @JoinColumn({ name: 'userId' })
  @ApiProperty({
    description: 'The user associated with the subscription',
    type: () => User,
  })
  user: User;
}
