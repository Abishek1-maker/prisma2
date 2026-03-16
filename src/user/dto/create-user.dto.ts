import { IsEmail, IsString, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;

  @IsString() //<-------STEP extra wrong vathyo agaadi------
  @Matches(/^[0-9]{10}$/, { message: 'number must be 10 digits only' })
  number: string;
}
