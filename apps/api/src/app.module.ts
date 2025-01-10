import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/user.entity';
import { Genre } from './genres/entities/genre.entity';
import { Language } from './languages/entities/language.entity';
import { GenresModule } from './genres/genres.module';
import { LanguagesModule } from './languages/languages.module';
import { ProfilesModule } from './profiles/profiles.module';
import { Profile } from './profiles/entities/profile.entity';
import { WatchHistoriesModule } from './watch-histories/watch-histories.module';
import { WatchHistory } from './watch-histories/entities/watch-history.entity';
import { PreferencesModule } from './preferences/preferences.module';
import { Preference } from './preferences/entities/preference.entity';
import { RecommendationsModule } from './recommendations/recommendations.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { Subscription } from './subscriptions/entities/subscription.entity';
import { ContentsModule } from './contents/contents.module';
import { Content } from './contents/entities/content.entity';

@Module({
  imports: [
    ConfigModule.forRoot(), // This loads environment variables
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'collert', // Use  actual password here
      database: 'netflix-clone', // Your database name
      entities: [
        User,
        Genre,
        Language,
        Profile,
        WatchHistory,
        Preference,
        Subscription,
        Content,
      ], // You will add your entities here
      synchronize: true, // Automatically synchronize schema (caution in production)
    }),
    UsersModule,
    AuthModule,
    GenresModule,
    LanguagesModule,
    ProfilesModule,
    WatchHistoriesModule,
    PreferencesModule,
    RecommendationsModule,
    SubscriptionsModule,
    ContentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
