import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/createProject.dto';
import { HasRoles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from '@prisma/client';
import { User } from 'src/auth/decorators/user.decorator';
import { SetImageDto } from 'src/image/dto/setImage.dto';

@Controller('projects')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

    @Get()
    async getAllProjects(@Query() query: any) {
        return await this.projectService.getAllProjects(query);
    }

    @HasRoles(Role.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    async createProject(
        @Body() createProjectDto: CreateProjectDto,
        @User('id') userId: number,
        @Body() setImageDto: SetImageDto,
    ) {
        return await this.projectService.createProject(
            createProjectDto,
            userId,
            setImageDto,
        );
    }

    @Get(':slug')
    async getProjectBySlug(@Param('slug') slug: string) {
        return await this.projectService.getProjectBySlug(slug);
    }
}
