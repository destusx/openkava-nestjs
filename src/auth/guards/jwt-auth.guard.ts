import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err: any, user: any, info: any, context: any, status: any) {
        if (!user) {
            console.log(err);
            throw new UnauthorizedException(
                'Неверный email или пароль(аунтификация jwt)',
            );
        }

        return user;
    }
}
