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

const config = {
  type: 'postgres',
  // host: 'localhost',
  // port: 5432,
  // username: 'postgres',
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_NAME,
  url: process.env.DB_HOST,
  // entities: ["dist/**/*.entity{.ts,.js}"],
  migrations: ['dist/migrations/*{.ts,.js}'],
  entities: [
    User,
    Genre,
    Language,
    Profile,
    WatchHistory,
    Preference,
    Subscription,
    Content,
  ],
  synchronize: true, // Disable synchronize in production
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
