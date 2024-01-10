import { Controller, Get, Query } from '@nestjs/common';
import { MenuService } from './menu.service';
import { Language, Menu } from '@prisma/client';

@Controller('menu')
export class MenuController {
    constructor(private readonly menuService: MenuService) {}

    @Get()
    async getMenu(@Query('language') language: Language): Promise<Menu[]> {
        return await this.menuService.getMenu(language);
    }
}
