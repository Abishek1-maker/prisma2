/* eslint-disable @typescript-eslint/no-misused-promises */
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { AuthJwtPayload } from './types/auth-jwtPaload';
import refreshJwtConfig from './config/refresh-jwt.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userservice: UserService,
    private jwtservice: JwtService,
    //----step5------::
    @Inject(refreshJwtConfig.KEY)
    private refreshTokenConfiguration: ConfigType<typeof refreshJwtConfig>,
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
  //create jwt token and refresh token return to controller auth
  //-------step1--------:: modify
  login(userId: number) {
    const payload: AuthJwtPayload = { sub: userId };
    const token = this.jwtservice.sign(payload); //<--make token from sign function redimate
    const refreshToken = this.jwtservice.sign(
      payload,
      this.refreshTokenConfiguration,
    );
    return { id: userId, token, refreshToken }; //<-- id,refreshtoken and token output
  }

  //-------------LASST FOR REFRESH-------------STEP 8:::-----------------------------
  refreshToken(userId: number) {
    const payload: AuthJwtPayload = { sub: userId };
    const token = this.jwtservice.sign(payload); //<--make token from sign function redimate(default)
    return { id: userId, token }; //<------now it is work as new access token---------
  }
}
