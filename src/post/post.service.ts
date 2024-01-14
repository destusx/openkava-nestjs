import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePostDto } from './dto/createPost.dto';
import { Language, Post } from '@prisma/client';
import { UpdatePostDto } from './dto/updatePost.dto';

@Injectable()
export class PostService {
    constructor(private prisma: PrismaService) {}

    async getAllPosts(query: any) {
        let take = 9;
        let skip = 0;
        let language: Language;

        if (query.language) {
            language = query.language;
        }

        if (query.limit) {
            take = +query.limit;
        }
        if (query.skip) {
            skip = +query.skip;
        }
        const posts = await this.prisma.post.findMany({
            where: {
                language,
            },
            skip,
            take,
            orderBy: { createdAt: 'desc' },
            include: { categories: true },
        });
        const postsCount = await this.prisma.post.count({
            where: {
                language,
            },
        });

        return {
            posts,
            postsCount,
        };
    }

    async getPostsByCategory(category: string, language: Language) {
        const posts = await this.prisma.post.findMany({
            where: {
                language,
                categories: {
                    some: {
                        slug: category,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
            include: { categories: true },
        });
        const postsCount = await this.prisma.post.count({
            where: {
                language,
                categories: {
                    some: {
                        slug: category,
                    },
                },
            },
        });

        return {
            posts,
            postsCount,
        };
    }

    async getPostBySlug(slug: string) {
        const post = await this.prisma.post.findFirst({
            where: { slug },
            include: { categories: true },
        });

        if (!post) {
            throw new HttpException(
                'Такого поста нет',
                HttpStatus.UNPROCESSABLE_ENTITY,
            );
        }

        await this.prisma.post.update({
            where: { id: post.id },
            data: { viewsCount: post.viewsCount + 1 },
        });

        return post;
    }

    async createPost(createPostDto: CreatePostDto, userId: number) {
        const {
            title,
            seoTitle,
            description,
            seoDescription,
            content,
            slug,
            image,
            categories,
            language,
        } = createPostDto;

        const existPost = await this.prisma.post.findFirst({
            where: { title: title },
        });

        if (existPost) {
            throw new HttpException(
                'Такая статья уже существует',
                HttpStatus.UNPROCESSABLE_ENTITY,
            );
        }

        const defaultImage = '/uploads/banner-default.png';

        const post = await this.prisma.post.create({
            data: {
                title,
                seoTitle,
                description,
                seoDescription,
                content,
                slug,
                language,
                image: image || defaultImage,
                authorId: userId,
                categories: {
                    connect: categories.map(categoryId => ({ id: categoryId })),
                },
            },
        });

        return post;
    }

    async updatePost(
        slug: string,
        updatePostDto: UpdatePostDto,
        userId: number,
    ) {
        const post = await this.prisma.post.findFirst({ where: { slug } });

        if (!post) {
            throw new HttpException(
                'Такого поста нет',
                HttpStatus.UNPROCESSABLE_ENTITY,
            );
        }

        if (post.authorId !== userId) {
            throw new HttpException(
                'Вы не автор статьи',
                HttpStatus.UNPROCESSABLE_ENTITY,
            );
        }

        const { title, content, image } = updatePostDto;

        const updatedPost = await this.prisma.post.update({
            where: { slug },
            data: { title, content, image },
        });

        return updatedPost;
    }

    async deletePost(slug: string, userId: number) {
        const post = await this.prisma.post.findFirst({ where: { slug } });

        if (!post) {
            throw new HttpException(
                'Такого поста нет',
                HttpStatus.UNPROCESSABLE_ENTITY,
            );
        }

        if (post.authorId !== userId) {
            throw new HttpException(
                'Вы не можете удалить этот пост, нет прав',
                HttpStatus.UNPROCESSABLE_ENTITY,
            );
        }

        return await this.prisma.post.delete({ where: { slug } });
    }
}
