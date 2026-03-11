/* eslint-disable @typescript-eslint/no-misused-promises */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userservice: UserService) {}

  async validateUser(email: string, password: string) {
    //<--this email,pass came from login API 'login' postman
    const user = await this.userservice.findByEmail(email); //user came from database of userservice we use prisma.user
    if (!user || !user.password)
      throw new UnauthorizedException('User not Found');
    const isPasswordMatch = await compare(password, user.password); //<-- that above const is user is this
    if (!isPasswordMatch)
      throw new UnauthorizedException('Invalid Credintials');

    return { id: user.id }; //<- no return password here we donot need all data od user bro
  }
}
