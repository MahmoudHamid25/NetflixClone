import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class WatchHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  profileId: string; // TODO: Add Many-to-One relation to Profiles in the future.

  @Column({ type: 'varchar' })
  contentId: string; // TODO: Add Many-to-One relation to Content in the future.

  @Column({ type: 'varchar', nullable: true })
  stoppedAt: string;

  @Column({ type: 'integer', default: 0 })
  watchCount: number;

  @Column({ type: 'varchar', nullable: true })
  subtitles: string;

  @Column({ type: 'varchar', nullable: true })
  dubs: string;
}
