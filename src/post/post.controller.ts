import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { HasRoles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Language, Role } from '@prisma/client';
import { CreatePostDto } from './dto/createPost.dto';
import { User } from 'src/auth/decorators/user.decorator';
import { UpdatePostDto } from './dto/updatePost.dto';

@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Get()
    async getAllPosts(@Query() query: any) {
        return await this.postService.getAllPosts(query);
    }

    @Get('category/:category')
    async getPostsByCategory(
        @Param('category') category: string,
        @Query('language') language: Language,
    ) {
        return await this.postService.getPostsByCategory(category, language);
    }

    @Get(':slug')
    async getPostBySlug(@Param('slug') slug: string) {
        return await this.postService.getPostBySlug(slug);
    }

    @HasRoles(Role.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    async createPost(
        @Body() createPostDto: CreatePostDto,
        @User('id') userId: number,
    ) {
        return await this.postService.createPost(createPostDto, userId);
    }

    @HasRoles(Role.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':slug')
    async updatePost(
        @Param('slug') slug: string,
        @Body() updatePostDto: UpdatePostDto,
        @User('id') userId: number,
    ) {
        return await this.postService.updatePost(slug, updatePostDto, userId);
    }

    @HasRoles(Role.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':slug')
    async deletePost(@Param('slug') slug: string, @User('id') userId: number) {
        return await this.postService.deletePost(slug, userId);
    }
}
