import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(), // This loads environment variables
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root', // Use  actual password here
      database: 'netflix-clone', // Your database name
      entities: [], // You will add your entities here
      synchronize: true, // Automatically synchronize schema (caution in production)
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
