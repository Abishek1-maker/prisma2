/* eslint-disable @typescript-eslint/no-unsafe-assignment */
//---------step 2: manually---------
import { registerAs } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';

export default registerAs(
  'refresh_jwt', //<-------Anyhow implement in authserve config.KEY-------
  (): JwtSignOptions => ({
    secret: process.env.Refresh_JWT_SECRET,
    expiresIn: (process.env.RefreshJWT_EXPIRE_IN ?? '1d') as any,
  }),
);
