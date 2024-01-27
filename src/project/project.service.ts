import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Language, Project } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateProjectDto } from './dto/createProject.dto';
import slugify from 'slugify';

@Injectable()
export class ProjectService {
    constructor(private prisma: PrismaService) {}

    async getAllProjects(query: any) {
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

        const projects = await this.prisma.project.findMany({
            where: {
                language,
            },
            skip,
            take,
            orderBy: { createdAt: 'desc' },
            include: { image: true },
        });
        const projectsCount = await this.prisma.project.count({
            where: {
                language,
            },
        });

        return {
            projects,
            projectsCount,
        };
    }

    async createProject(
        createProjectDto: CreateProjectDto,
        userId: number,
    ): Promise<Project> {
        const {
            title,
            content,
            budget,
            address,
            image,
            openedData,
            language,
            floorArea,
        } = createProjectDto;

        const slug = this.getSlug(title);

        const existProject = await this.prisma.project.findFirst({
            where: { title: title },
        });

        if (existProject) {
            throw new HttpException(
                'Такой проект уже существует',
                HttpStatus.UNPROCESSABLE_ENTITY,
            );
        }

        const project = await this.prisma.project.create({
            data: {
                title,
                content,
                slug,
                language,
                authorId: userId,
                budget,
                address,
                openedData,
                floorArea,
                image: {
                    connect: { id: image },
                },
            },
            include: { image: true },
        });

        return project;
    }

    async getProjectBySlug(slug: string) {
        const project = await this.prisma.project.findFirst({
            where: { slug },
            include: { image: true },
        });

        if (!project) {
            throw new HttpException(
                'Такого поста нет',
                HttpStatus.UNPROCESSABLE_ENTITY,
            );
        }

        return project;
    }

    private getSlug(title: string): string {
        return slugify(title, {
            replacement: '-',
            lower: true,
            trim: true,
            strict: true,
        });
    }
}
