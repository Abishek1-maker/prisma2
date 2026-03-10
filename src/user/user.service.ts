import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(Data: CreateUserDto) {
    if (Data.password) {
      Data.password = await bcrypt.hash(Data.password, 10);
    }
    return await this.prisma.user.create({ data: Data });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: number, Data: UpdateUserDto) {
    if (Data.password) {
      Data.password = await bcrypt.hash(Data.password, 10);
    }
    return await this.prisma.user.update({ where: { id }, data: Data });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
