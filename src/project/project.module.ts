import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { PrismaService } from 'src/prisma.service';
import { ImageService } from 'src/image/image.service';

@Module({
    controllers: [ProjectController],
    providers: [ProjectService, PrismaService, ImageService],
})
export class ProjectModule {}
