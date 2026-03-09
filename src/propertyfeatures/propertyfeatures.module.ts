import { Module } from '@nestjs/common';
import { PropertyfeaturesService } from './propertyfeatures.service';
import { PropertyfeaturesController } from './propertyfeatures.controller';

@Module({
  controllers: [PropertyfeaturesController],
  providers: [PropertyfeaturesService],
})
export class PropertyfeaturesModule {}
