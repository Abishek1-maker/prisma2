/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Request() req: any) {
    return this.authService.login(req.user.id); //id,refreshToken and token output
  }
  //---------Refresh Token API----------
  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  refreshToken(@Request() req: any) {
    return this.authService.refreshToken(req.user.id);
  }

  //-------STEP 8-------
  @UseGuards(JwtAuthGuard)
  @Post('signout')
  signout(@Request() req) {
    return this.authService.signout(req.user.id);
  }
}
