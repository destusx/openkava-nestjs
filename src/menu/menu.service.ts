import { Injectable } from '@nestjs/common';
import { Language, Menu } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MenuService {
    constructor(private prisma: PrismaService) {}

    async getMenu(language: Language): Promise<Menu[]> {
        return await this.prisma.menu.findMany({
            where: {
                language,
            },
        });
    }
}
