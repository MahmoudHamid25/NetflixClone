import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Profile } from '../../profiles/entities/profile.entity';
import { Genre } from '../../genres/entities/genre.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Preference {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'The unique identifier of the preference',
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  id: string;

  @ManyToOne(() => Profile, (profile) => profile.preferences, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'profileId' })
  @ApiProperty({
    description: 'The profile associated with this preference',
    type: () => Profile,
  })
  profile: Profile;

  @Column({ type: 'integer' })
  @ApiProperty({
    description: 'The minimum age preference',
    example: 18,
  })
  minAge: number;

  @ManyToMany(() => Genre, (genre) => genre.preferences, { nullable: true })
  @JoinTable({
    name: 'preference_genre', // This table stores the many-to-many relationship
    joinColumn: { name: 'preferenceId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'genreId', referencedColumnName: 'id' },
  })
  @ApiProperty({
    description: 'The genres associated with this preference',
    type: () => [Genre],
  })
  genres: Genre[];

  @Column({ type: 'boolean', default: false })
  @ApiProperty({
    description: 'Indicates whether series are preferred',
    example: true,
  })
  seriesPreferred: boolean;

  @Column({ type: 'boolean', default: false })
  @ApiProperty({
    description: 'Indicates whether films are preferred',
    example: false,
  })
  filmsPreferred: boolean;

  @Column({ type: 'varchar', array: true, nullable: true })
  @ApiProperty({
    description: 'The classifications preferred for viewing',
    example: ['PG', 'R', 'NC-17'],
    nullable: true,
  })
  viewingClassification: string[];
}
