/* eslint-disable @typescript-eslint/no-misused-promises */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { AuthJwtPayload } from './types/auth-jwtPaload';

@Injectable()
export class AuthService {
  constructor(
    private readonly userservice: UserService,
    private jwtservice: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userservice.findByEmail(email);
    if (!user || !user.password)
      throw new UnauthorizedException('User not Found');
    const isPasswordMatch = await compare(password, user.password);
    if (!isPasswordMatch)
      throw new UnauthorizedException('Invalid Credintials');

    return { id: user.id };
  }
  //create jwt token return to controller auth step:2
  login(userId: number) {
    const payload: AuthJwtPayload = { sub: userId };
    return this.jwtservice.sign(payload);
  }
}
