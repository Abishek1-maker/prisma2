import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
//STEP 6: THRU TERMINAL
@Injectable()
export class RefreshAuthGuard extends AuthGuard('refresh-jwt') {} //<--From refresh strategu '<name>'
