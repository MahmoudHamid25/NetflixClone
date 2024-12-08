import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsOptional, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @MinLength(15)
  password: string;

  @IsOptional()
  login_attempts: number;
  
  @IsOptional()
  account_status: string;
}
