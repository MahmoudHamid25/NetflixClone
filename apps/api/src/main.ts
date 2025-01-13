import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:3000', // Replace with your Next.js app URL
    credentials: true, // Allow cookies and other credentials
  });

  const config = new DocumentBuilder()
    .setTitle('Netflix Clone API')
    .setDescription('API documentation for the Netflix Clone application')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Auth')
    // .addTag("Users")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT');
  await app.listen(PORT || 4000);
}

bootstrap();
