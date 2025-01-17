import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Preference } from '../../preferences/entities/preference.entity';
import { Language } from '../../languages/entities/language.entity';
import { User } from '../../users/entities/user.entity';
import { WatchHistory } from '../../watch-histories/entities/watch-history.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'The unique identifier of the profile',
    example: 'a22a2f7e-c6f8-43c9-b4c5-10e77fe62a6b',
  })
  id: string;

  @Column({ type: 'varchar' })
  @ApiProperty({
    description: 'The profile image URL',
    example: 'https://example.com/profile-image.jpg',
  })
  image: string;

  @Column({ type: 'date' })
  @ApiProperty({
    description: 'The date of birth of the profile owner',
    example: '1990-05-20',
  })
  dateOfBirth: Date;

  @ManyToOne(() => User, (user) => user.profiles, { nullable: false })
  @JoinColumn({ name: 'userId' })
  @ApiProperty({
    description: 'The user associated with this profile',
    type: () => User,
  })
  user: User;

  @ManyToOne(() => Language, (language) => language.profiles)
  @JoinColumn({ name: 'languageId' })
  @ApiProperty({
    description: 'The language associated with this profile',
    type: () => Language,
  })
  language: Language;

  @OneToMany(() => Preference, (preference) => preference.profile)
  @ApiProperty({
    description: 'The list of preferences associated with this profile',
    type: () => [Preference],
  })
  preferences: Preference[];

  @OneToMany(() => WatchHistory, (watchHistory) => watchHistory.profile)
  watchHistories: WatchHistory[];
}
