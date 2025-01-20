import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Genre } from '../genres/entities/genre.entity';
import { Language } from '../languages/entities/language.entity';
import { Profile } from '../profiles/entities/profile.entity';
import { WatchHistory } from '../watch-histories/entities/watch-history.entity';
import { Preference } from '../preferences/entities/preference.entity';
import { Subscription } from '../subscriptions/entities/subscription.entity';
import { Content } from '../contents/entities/content.entity';
import { User } from '../users/entities/user.entity';

dotenvConfig({ path: '.env' });

//senior_db_user role
const config = {
  type: 'postgres',
  url: process.env.DB_HOST_SENIOR,
  // entities: ["dist/**/*.entity{.ts,.js}"],
  migrations: ['dist/migrations/*{.ts,.js}'],

  entities: [
    User,
    Genre,
    Language,
    Profile,
    WatchHistory,
    Preference,
    Content,
    Subscription
  ],
  synchronize: false, // Disable synchronize in production
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);

// api_db_use role
export const apiDbConfig: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DB_HOST_API,
  entities: [
    User,
    Genre,
    Language,
    Profile,
    WatchHistory,
    Preference,
    Content,
    Subscription
  ],
  synchronize: false,
};