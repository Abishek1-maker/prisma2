//If the JWT is valid and alow user to access or not

//created manually
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import jwtConfig from '../config/jwt.config';
import { AuthJwtPayload } from '../types/auth-jwtPaload';
import { Inject, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(jwtConfig.KEY)
    private jwtConfiguration: ConfigType<typeof jwtConfig>,
    private authservice: AuthService, //-----Role step 10::-------
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //<--from where to req
      secretOrKey: jwtConfiguration.secret as string, //<--get from configuration secret key to decode
      ignoreExpiration: false,
    });
  }
  //-----------Role-STEP7: Adding Role in Request.user---------------
  //it is  not for jwt validate it is just receice decode payload that decode was done from Aboce base code in up super
  //payload has aready validated then passed here
  validate(payload: AuthJwtPayload) {
    const userId = payload.sub;
    return this.authservice.validateJwtUser(userId);
  }
}
