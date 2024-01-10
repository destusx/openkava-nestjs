import { Injectable } from '@nestjs/common';
import { Language } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService) {}

    async getCategories(language: Language) {
        return await this.prisma.category.findMany({
            where: {
                language,
            },
        });
    }
}
