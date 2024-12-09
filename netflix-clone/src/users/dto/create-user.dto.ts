import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @MinLength(15)
  password: string;

  @IsString()
  refreshToken?: string;

  @IsString()
  socialId?: string;
}
