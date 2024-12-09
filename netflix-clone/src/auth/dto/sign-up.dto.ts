import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({
    description: 'Email address of the user',
    example: 'user@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Username of the user',
    example: 'john_doe',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Password for the user account',
    minLength: 6,
    example: 'P@ssw0rd123',
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
