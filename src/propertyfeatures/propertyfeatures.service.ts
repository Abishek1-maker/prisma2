/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { CreatePropertyfeatureDto } from './dto/create-propertyfeature.dto';
import { UpdatePropertyfeatureDto } from './dto/update-propertyfeature.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PropertyfeaturesService {
  constructor(private prisma: PrismaService) {}

  async create(Data: CreatePropertyfeatureDto) {
    return await this.prisma.propertyfeatures.create({ data: Data });
  }

  findAll() {
    return this.prisma.propertyfeatures.findMany();
  }

  findOne(id: number) {
    return this.prisma.propertyfeatures.findUnique({ where: { id } });
  }

  async update(id: number, updatePropertyfeatureDto: UpdatePropertyfeatureDto) {
    return await this.prisma.propertyfeatures.update({
      where: { id },
      data: updatePropertyfeatureDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} propertyfeature`;
  }
}
