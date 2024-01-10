import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(email);

        let isPasswordCorrect: boolean;

        try {
            isPasswordCorrect = await argon2.verify(user.password, password);
        } catch (error) {
            throw new UnauthorizedException('Неверный пароль или email');
        }

        if (user && isPasswordCorrect) {
            return user;
        }

        return null;
    }

    async login(user: User) {
        const payload = { email: user.email, id: user.id, role: user.role };
        return {
            ...user,
            token: this.jwtService.sign(payload),
        };
    }
}
