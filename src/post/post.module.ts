import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PrismaService } from 'src/prisma.service';
import { ImageService } from 'src/image/image.service';

@Module({
    controllers: [PostController],
    providers: [PostService, PrismaService, ImageService],
})
export class PostModule {}
