import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Profile } from '../../profiles/entities/profile.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Language {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'The unique identifier of the language',
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  id: string;

  @Column({ type: 'varchar' })
  @ApiProperty({
    description: 'The name of the language',
    example: 'English',
  })
  name: string;

  @Column({ type: 'varchar', unique: true })
  @ApiProperty({
    description: 'The unique language code (e.g., ISO 639-1 code)',
    example: 'en',
  })
  code: string;

  @OneToMany(() => Profile, (profile) => profile.language)
  @ApiProperty({
    description: 'A list of profiles associated with this language',
    type: () => [Profile],
  })
  profiles: Profile[];
}
