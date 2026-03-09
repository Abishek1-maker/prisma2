/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNumber, IsPositive, IsString, Length } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  @Length(3, 10, { message: 'name should be min 3 and max 10 char' })
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @IsPositive()
  price: number;
}
