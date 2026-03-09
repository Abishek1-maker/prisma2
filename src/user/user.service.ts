import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(Data: CreateUserDto) {
    return await this.prisma.user.create({ data: Data });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  update(id: number, Data: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data: Data });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
