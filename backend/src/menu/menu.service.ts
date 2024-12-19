import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  async getMenus() {
    return this.prisma.menu.findMany();
  }

  async createMenu(data: CreateMenuDto) {
    return this.prisma.menu.create({ data });
  }

  async updateMenu(id: string, data: Partial<CreateMenuDto>) {
    return this.prisma.menu.update({ where: { id }, data });
  }

  async deleteMenu(id: string) {
    return this.prisma.menu.delete({ where: { id } });
  }
}
