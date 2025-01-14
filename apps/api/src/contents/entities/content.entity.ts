import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Content {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'Unique identifier for the content',
    example: 'f3e5e5f1-6c9b-4d16-92bb-d9e5a7a53935',
  })
  id: string;

  @Column({ type: 'varchar' })
  @ApiProperty({
    description: 'The title of the content (e.g., film title, series name)',
    example: 'The Matrix',
  })
  title: string;

  @Column({ type: 'varchar' })
  @ApiProperty({
    description: 'The type of the content, such as film, series, episode',
    example: 'film',
  })
  type: string; // e.g., film, series, episode

  @Column({ type: 'text' })
  @ApiProperty({
    description: 'A description of the content',
    example:
      'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
  })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({
    description: 'The URL of the preview image for the content',
    example: 'http://example.com/preview.jpg',
    nullable: true,
  })
  preview_image: string;

  @Column({ type: 'date', nullable: true })
  @ApiProperty({
    description: 'The release date of the content',
    example: '1999-03-31',
    nullable: true,
  })
  release_date: Date;

  @Column({ type: 'jsonb', nullable: true })
  @ApiProperty({
    description: 'Subtitles available for the content',
    nullable: true,
  })
  subs: object;

  @Column({ type: 'jsonb', nullable: true })
  @ApiProperty({
    description: 'Dubbed versions available for the content',
    nullable: true,
  })
  dubs: object;

  @Column({ type: 'varchar', array: true, nullable: true })
  @ApiProperty({
    description: 'Available video qualities (e.g., 720p, 1080p)',
    example: ['720p', '1080p'],
    nullable: true,
  })
  available_qualities: string[];

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({
    description: 'Credits related to the content (e.g., directors, actors)',
    example: 'Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss',
    nullable: true,
  })
  credits: string;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({
    description:
      'Parent content ID, if this content is part of a series or a movie franchise',
    example: 'abcd-1234-xyz',
    nullable: true,
  })
  parent_content_id: string;

  @Column({ type: 'integer', nullable: true })
  @ApiProperty({
    description: 'Season number if the content is part of a series',
    example: 1,
    nullable: true,
  })
  season: number;

  @Column({ type: 'integer', nullable: true })
  @ApiProperty({
    description: 'Episode number if the content is an episode in a series',
    example: 3,
    nullable: true,
  })
  episode_number: number;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({
    description: 'The URL of the video hosted on Cloudinary or similar service',
    example:
      'https://res.cloudinary.com/your-cloud-name/video/upload/v1616600992/your-video-path.mp4',
    nullable: true,
  })
  videoUrl: string;
}
