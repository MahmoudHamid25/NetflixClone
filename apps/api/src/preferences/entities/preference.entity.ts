import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Preference {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  profileId: string; // TODO: Add many to one relation to profiles

  @Column({ type: 'integer' })
  minAge: number;

  @Column({ type: 'varchar', array: true, nullable: true })
  genres: string[]; // TODO: Add many to many relation to genres

  @Column({ type: 'boolean', default: false })
  seriesPreferred: boolean;

  @Column({ type: 'boolean', default: false })
  filmsPreferred: boolean;

  @Column({ type: 'varchar', array: true, nullable: true })
  viewingClassification: string[];
}
