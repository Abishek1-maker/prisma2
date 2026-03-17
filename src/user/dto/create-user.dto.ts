import { IsEmail, IsEnum, IsString, Matches } from 'class-validator';
import { Role } from 'src/auth/enums/role.enum';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;

  @IsEnum(Role, { message: 'Role must be one of : ADMIN, USER, EDITOR' })
  role: Role; //<-----------Role-STEP:3---------

  @IsString()
  @Matches(/^[0-9]{10}$/, { message: 'number must be 10 digits only' })
  number: string;
}
