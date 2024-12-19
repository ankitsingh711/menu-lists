import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  getAllMenus() {
    return this.menuService.getMenus();
  }

  @Post()
  createMenu(@Body() data: CreateMenuDto) {
    return this.menuService.createMenu(data);
  }

  @Patch(':id')
  updateMenu(@Param('id') id: string, @Body() data: Partial<CreateMenuDto>) {
    return this.menuService.updateMenu(id, data);
  }

  @Delete(':id')
  deleteMenu(@Param('id') id: string) {
    return this.menuService.deleteMenu(id);
  }
}
