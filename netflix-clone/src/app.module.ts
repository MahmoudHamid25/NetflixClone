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
      entities: [User, Genre, Language], // You will add your entities here
      synchronize: true, // Automatically synchronize schema (caution in production)
    }),
    UsersModule,
    AuthModule,
    GenresModule,
    LanguagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
