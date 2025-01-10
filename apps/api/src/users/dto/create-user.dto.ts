import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;

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
  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `Password must contain Minimum 8 and maximum 20 characters, 
    at least one uppercase letter, 
    one lowercase letter, 
    one number and 
    one special character`,
  })
  @MinLength(6)
  password: string;

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
