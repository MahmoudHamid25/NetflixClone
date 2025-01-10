import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  type: string;

  @Column({ type: 'double precision' })
  cost: number;

  @Column({ type: 'varchar' })
  currency: string;

  @Column({ type: 'text', nullable: true })
  benefits: string;
}
