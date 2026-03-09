import { IsEmail, IsInt, IsPositive, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsInt()
  @IsPositive()
  number: number;
}
