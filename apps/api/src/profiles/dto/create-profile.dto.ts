import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  image: string;

  @IsDateString() // Perhaps we could create a custom validator, because now it accepts years past 2025
  @IsNotEmpty()
  dateOfBirth: string;

  @IsString()
  @IsNotEmpty()
  userId: string; // TODO: Add validation for existing user

  @IsString()
  @IsNotEmpty()
  languageId: string; // TODO: Add validation for existing language
}
