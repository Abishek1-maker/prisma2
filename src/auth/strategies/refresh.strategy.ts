//---------STEP 5: Created manually---------
//---------Validate refresh token--------
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthJwtPayload } from '../types/auth-jwtPaload';
import { Inject, Injectable } from '@nestjs/common';
import refreshJwtConfig from '../config/refresh-jwt.config';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor(
    @Inject(refreshJwtConfig.KEY)
    private refreshjwtConfiguration: ConfigType<typeof refreshJwtConfig>, //<--Dependencies----
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //<--from where to req we can do from body also()
      secretOrKey: refreshjwtConfiguration.secret as string, //<--get from configuration secret key to decode
      ignoreExpiration: false,
    });
  }
  //it is  not for jwt validate it is just receice decode payload that decode was done from Aboce base code in up super
  //payload has aready validated then passed here if not expire refreshtoken
  validate(payload: AuthJwtPayload) {
    return { id: payload.sub }; //<---sub is user id see in auth service it is now decoded-----
  }
}
