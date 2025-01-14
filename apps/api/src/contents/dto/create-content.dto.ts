import { IsString, IsDate, IsArray, IsNumber, IsObject } from 'class-validator';

export class CreateContentDto {
  @IsString()
  title: string;

  @IsString()
  type: string;

  @IsString()
  description: string;

  @IsString()
  preview_image?: string;

  @IsDate()
  release_date?: Date;

  @IsObject()
  subs?: object;

  @IsObject()
  dubs?: object;

  @IsArray()
  available_qualities?: string[];

  @IsString()
  credits?: string;

  @IsString()
  parent_content_id?: string;

  @IsNumber()
  season?: number;

  @IsNumber()
  episode_number?: number;
}
