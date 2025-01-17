import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Preference } from '../../preferences/entities/preference.entity';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'The unique identifier of the genre',
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  id: string;

  @Column({ type: 'varchar' })
  @ApiProperty({
    description: 'The name of the genre',
    example: 'Action',
  })
  name: string;

  @Column({ type: 'varchar' })
  @ApiProperty({
    description: 'A brief description of the genre',
    example: 'Fast-paced, exciting films with intense action scenes.',
  })
  description: string;

  @ManyToMany(() => Preference, (preference) => preference.genres)
  preferences: Preference[]; // Many-to-many relation with Preference
}
