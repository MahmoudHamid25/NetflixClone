import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  image: string;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column({ type: 'varchar' })
  userId: string; // TODO: Add many to one relation to "users" in the future

  @Column({ type: 'varchar' })
  languageId: string; // TODO: Add many to one relation to "languages" in the future.
}
