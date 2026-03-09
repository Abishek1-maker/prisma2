import { IsBoolean, IsInt, IsPositive, IsUppercase } from 'class-validator';

export class CreatePropertyfeatureDto {
  @IsInt()
  @IsPositive()
  bedroom: number;

  @IsBoolean()
  hall: boolean;

  @IsBoolean()
  kitchen: boolean;

  @IsBoolean()
  @IsUppercase()
  Bathroom: boolean;

  @IsInt()
  Propertyid: number;
}
