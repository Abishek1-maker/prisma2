//--------STEP 5::-Validate The refresh token--------
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthJwtPayload } from '../types/auth-jwtPaload';
import { Inject, Injectable } from '@nestjs/common';
import refreshJwtConfig from '../config/refresh-jwt.config';
import { Request } from 'express';
import { AuthService } from '../auth.service';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor(
    @Inject(refreshJwtConfig.KEY)
    private refreshjwtConfiguration: ConfigType<typeof refreshJwtConfig>, //<--Dependencies----
    private authservice: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //<--from where to req we can do from body also()
      secretOrKey: refreshjwtConfiguration.secret as string, //<--get from configuration secret key to decode
      ignoreExpiration: false,
      passReqToCallback: true, //<<--pass the req parameter in validate function for callback
    });
  }
  //it is  not for jwt validate it is just receice decode payload that decode was done from Aboce base code in up super
  //payload has aready validated then passed here if not expire refreshtoken
  validate(req: Request, payload: AuthJwtPayload) {
    //Request is from express
    const refreshTokenHeader = req.get('authorization');
    if (!refreshTokenHeader) {
      throw new Error('No refresh token provided');
    }
    const refreshToken = refreshTokenHeader.replace('Bearer', '').trim();
    const userId = payload.sub; //-----Extract the user Id from out payload-----
    return this.authservice.validateRefreshToken(userId, refreshToken); //<--if valid then return user Id
  }
}
