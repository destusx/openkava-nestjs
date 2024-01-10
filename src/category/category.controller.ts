import { Controller, Get, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Language } from '@prisma/client';

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    async getCategories(@Query('language') language: Language) {
        return await this.categoryService.getCategories(language);
    }
}
