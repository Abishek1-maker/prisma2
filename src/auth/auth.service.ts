/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { AuthJwtPayload } from './types/auth-jwtPaload';
import refreshJwtConfig from './config/refresh-jwt.config';
import { ConfigType } from '@nestjs/config';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly userservice: UserService,
    private jwtservice: JwtService,
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
  //----------------------------------step:: 3---------------------
  async login(userId: number) {
    // const payload: AuthJwtPayload = { sub: userId };
    // const token = this.jwtservice.sign(payload); //<--make token from sign function redimate
    // const refreshToken = this.jwtservice.sign(
    //   payload,
    //   this.refreshTokenConfiguration,
    // );
    const { accessToken, refreshToken } = await this.generateTokens(userId);
    const hashedRefreshToken = await argon2.hash(refreshToken);
    await this.userservice.updateHashedRefreahToken(userId, hashedRefreshToken); //--calling---storing the hashed refresh token in database---------
    return { id: userId, accessToken, refreshToken }; //<-- id, original refreshtoken and accesstoken output
  }

  //----------Generate Token--STEP::2---------------------
  async generateTokens(userId: number) {
    const payload: AuthJwtPayload = { sub: userId };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtservice.signAsync(payload),
      this.jwtservice.signAsync(payload, this.refreshTokenConfiguration),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  //---------STEP 7::----FOR REFRESH-----
  async refreshToken(userId: number) {
    const { accessToken, refreshToken } = await this.generateTokens(userId);
    const hashedRefreshToken = await argon2.hash(refreshToken);
    await this.userservice.updateHashedRefreahToken(userId, hashedRefreshToken); //--calling---storing the hashed refresh token in database---------
    return { id: userId, accessToken, refreshToken };
  }
  //-------------STEP 6 ::----------------------------------
  async validateRefreshToken(userId: number, refreshToken: string) {
    //<---refreshToken extract from request it is original---------
    const user = await this.userservice.findOne(userId);
    if (!user || !user.hashedRefreshToken)
      throw new UnauthorizedException('invalid Refresh Token');
    const refreshTokenMatches = await argon2.verify(
      user.hashedRefreshToken,
      refreshToken,
    );
    if (!refreshTokenMatches)
      throw new UnauthorizedException('Refresh Token is not Matches');
    return { id: userId };
  }

  //---STEP 7--Sign Out--
  async signout(userId: number) {
    await this.userservice.updateHashedRefreahToken(userId, '');
    return { message: 'Your id is sign out' };
  }
}
