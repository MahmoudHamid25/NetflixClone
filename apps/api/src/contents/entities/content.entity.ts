import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Content {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  type: string; // e.g., film, series, episode

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  preview_image: string;

  @Column({ type: 'date', nullable: true })
  release_date: Date;

  @Column({ type: 'jsonb', nullable: true })
  subs: object;

  @Column({ type: 'jsonb', nullable: true })
  dubs: object;

  @Column({ type: 'varchar', array: true, nullable: true })
  available_qualities: string[];

  @Column({ type: 'varchar', nullable: true })
  credits: string;

  @Column({ type: 'varchar', nullable: true })
  parent_content_id: string;

  @Column({ type: 'integer', nullable: true })
  season: number;

  @Column({ type: 'integer', nullable: true })
  episode_number: number;
}
