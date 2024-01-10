import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { HasRoles } from './decorators/roles.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from './guards/roles.guard';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @HasRoles(Role.ADMIN)
    @UseGuards(LocalAuthGuard, RolesGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @HasRoles(Role.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('user')
    getProfile(@Request() req) {
        return req.user;
    }
}
