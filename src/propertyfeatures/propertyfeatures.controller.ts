/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PropertyfeaturesService } from './propertyfeatures.service';
import { CreatePropertyfeatureDto } from './dto/create-propertyfeature.dto';
import { UpdatePropertyfeatureDto } from './dto/update-propertyfeature.dto';

@Controller('propertyfeatures')
export class PropertyfeaturesController {
  constructor(
    private readonly propertyfeaturesService: PropertyfeaturesService,
  ) {}

  @Post()
  create(@Body() Data: CreatePropertyfeatureDto) {
    return this.propertyfeaturesService.create(Data);
  }

  @Get()
  findAll() {
    return this.propertyfeaturesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertyfeaturesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePropertyfeatureDto: UpdatePropertyfeatureDto,
  ) {
    return this.propertyfeaturesService.update(+id, updatePropertyfeatureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertyfeaturesService.remove(+id);
  }
}
