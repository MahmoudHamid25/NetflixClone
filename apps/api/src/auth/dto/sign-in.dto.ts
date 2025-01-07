import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({
    description: 'Email address of the user',
    example: 'user@example.com',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    minLength: 6,
    example: 'P@ssw0rd123',
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
