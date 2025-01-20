import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { GenresModule } from './genres/genres.module';
import { LanguagesModule } from './languages/languages.module';
import { ProfilesModule } from './profiles/profiles.module';
import { WatchHistoriesModule } from './watch-histories/watch-histories.module';
import { PreferencesModule } from './preferences/preferences.module';
import { RecommendationsModule } from './recommendations/recommendations.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { ContentsModule } from './contents/contents.module';
import typeorm, { apiDbConfig } from './config/typeorm';
import { AccessControlModule } from './roles/access-control.module';
import { RouterModule } from '@nestjs/core';
import { FilmsModule } from './contents/films/films.module';
import { EpisodesModule } from './contents/episodes/episodes.module';
import { SeasonsModule } from './contents/seasons/seasons.module';
import { SeriesModule } from './contents/series/series.module';
import { UploadModule } from './upload/upload.module';
import { CloudinaryConfigService } from './config/cloudinary.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
      cache: true,
    }),
    // Default connection for senior_db_user
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const typeOrmConfig =
          configService.get<TypeOrmModuleOptions>('typeorm');
        if (!typeOrmConfig) {
          throw new Error('TypeORM configuration is not defined');
        }
        return typeOrmConfig;
      },
    }),
    // Additional connection for api_db_user
    TypeOrmModule.forRoot({
      ...apiDbConfig,
      name: 'api_db_connection',
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
    AccessControlModule,
    ContentsModule,
    RouterModule.register([
      {
        path: 'contents',
        module: ContentsModule,
        children: [
          {
            path: 'films',
            module: FilmsModule,
          },
          {
            path: 'episodes',
            module: EpisodesModule,
          },
          {
            path: 'seasons',
            module: SeasonsModule,
          },
          {
            path: 'series',
            module: SeriesModule,
          },
        ],
      },
    ]),
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService, CloudinaryConfigService],
})
export class AppModule {
  constructor(
    private readonly cloudinaryConfigService: CloudinaryConfigService,
  ) {
    // Call the configure method to initialize Cloudinary
    this.cloudinaryConfigService.configure();
  }
}
