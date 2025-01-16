import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'The username of the user',
    type: String,
    minLength: 3,
    example: 'john_doe',
  })
  @IsNotEmpty()
  @MinLength(3, { message: 'Username must have atleast 3 characters.' })
  @IsAlphanumeric('en-US', {
    message: 'Username does not allow other than alpha numeric chars.',
  })
  username: string;

  @ApiProperty({
    description: 'The email of the user',
    type: String,
    example: 'johndoe@example.com',
  })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please provide valid Email.' })
  email: string;

  @ApiProperty({
    description: 'The password for the user',
    type: String,
    minLength: 8,
    example: 'P@ssw0rd123',
  })
  @MinLength(6, {
    message: 'Password must contain at least 6 characters',
  })
  password?: string;

  @ApiProperty({
    description: 'Optional refresh token for the user',
    type: String,
    required: false,
  })
  @IsString()
  refreshToken?: string;

  @ApiProperty({
    description:
      'Optional social media ID for users logging in via social authentication',
    type: String,
    required: false,
  })
  @IsString()
  socialId?: string;
}
