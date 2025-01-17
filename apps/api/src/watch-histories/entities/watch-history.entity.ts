import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Profile } from '../../profiles/entities/profile.entity';
import { Content } from '../../contents/entities/content.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class WatchHistory {
  @ApiProperty({ description: 'Unique identifier for the watch history entry' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Profile, (profile) => profile.watchHistories, {
    nullable: false,
  })
  profile: Profile;

  @ApiProperty({ description: 'Content associated with this watch history' })
  @ManyToOne(() => Content, (content) => content.watchHistories, {
    nullable: false,
  })
  content: Content;

  @ApiProperty({ description: 'Timestamp when the watch was stopped' })
  @Column({ type: 'varchar', nullable: true })
  stoppedAt: string;

  @ApiProperty({ description: 'Number of times the content has been watched' })
  @Column({ type: 'integer', default: 0 })
  watchCount: number;

  @ApiProperty({ description: 'Subtitles language used for the content' })
  @Column({ type: 'varchar', nullable: true })
  subtitles: string;

  @ApiProperty({ description: 'Dubs language used for the content' })
  @Column({ type: 'varchar', nullable: true })
  dubs: string;
}
