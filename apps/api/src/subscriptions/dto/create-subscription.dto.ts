import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubscriptionDto {
  @ApiProperty({
    description: 'The type of the subscription',
    example: 'Premium',
  })
  @IsString()
  type: string;

  @ApiProperty({
    description: 'The cost of the subscription',
    example: 9.99,
  })
  @IsNumber()
  cost: number;

  @ApiProperty({
    description: 'The currency of the subscription cost',
    example: 'USD',
  })
  @IsString()
  currency: string;

  @ApiProperty({
    description: 'The benefits of the subscription',
    example: 'Access to all movies and series.',
  })
  @IsString()
  benefits: string;
}
