import { Module } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { LanguagesController } from './languages.controller';
import { Language } from './entities/language.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessControlModule } from '../roles/access-control.module';

@Module({
  imports: [TypeOrmModule.forFeature([Language]), AccessControlModule],
  controllers: [LanguagesController],
  providers: [LanguagesService],
  exports: [LanguagesService],
})
export class LanguagesModule {}
