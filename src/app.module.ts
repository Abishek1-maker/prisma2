import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropertyModule } from './property/property.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { PropertyfeaturesModule } from './propertyfeatures/propertyfeatures.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    PropertyModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PropertyfeaturesModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
