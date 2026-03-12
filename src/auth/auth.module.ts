import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import refreshJwtConfig from './config/refresh-jwt.config';
import { RefreshJwtStrategy } from './strategies/refresh.strategy';

@Module({
  imports: [
    //-------------STEP 3-----------::
    JwtModule.registerAsync(jwtConfig.asProvider()), //<------imported file in whole file-----
    ConfigModule.forFeature(jwtConfig), //<-----register inside module to get access used in jwt strategy
    ConfigModule.forFeature(refreshJwtConfig), //<-----Used in auth service-----
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
  ], //<--refresh strategy register------
})
export class AuthModule {}
