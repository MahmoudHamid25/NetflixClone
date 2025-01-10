import { IsString, IsNumber } from 'class-validator';

export class CreateSubscriptionDto {
  @IsString()
  type: string;

  @IsNumber()
  cost: number;

  @IsString()
  currency: string;

  @IsString()
  benefits: string;
}
