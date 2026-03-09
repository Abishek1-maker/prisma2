/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PropertyService {
  constructor(private prisma: PrismaService) {}
  async create(Data: CreatePropertyDto) {
    console.log('Checking data console create', Data);
    return await this.prisma.property.create({ data: Data });
  }

  findAll() {
    return this.prisma.property.findMany();
  }

  findOne(id: number) {
    return this.prisma.property.findUnique({
      where: { id },
    });
  }

  async update(id: number, updatePropertyDto: UpdatePropertyDto) {
    console.log('Cheking update id data', updatePropertyDto);
    return await this.prisma.property.update({
      where: { id },
      data: updatePropertyDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} property`;
  }
}
