import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    handleRequest(err: any, user: any, info: any, context: any, status: any) {
        if (!user) {
            console.log(err);
            throw new UnauthorizedException('Неверный email или пароль(логин)');
        }

        return user;
    }
}
