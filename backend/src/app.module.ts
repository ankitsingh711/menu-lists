import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { MenuController } from './menu/menu.controller';
import { MenuService } from './menu/menu.service';

@Module({
  imports: [],
  controllers: [AppController, MenuController],
  providers: [AppService, PrismaService, MenuService],
})
export class AppModule {}
