//Created manually strategy
//This strategy collect email and password  from the body of our login api and just pass them to validate function

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authservice: AuthService) {
    super({
      usernameField: 'email',
      //   passwordField: 'password', it is used it your that field is like pass
    });
  }
  validate(email: string, password: string) {
    return this.authservice.validateUser(email, password);
  }
}
