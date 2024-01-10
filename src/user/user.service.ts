import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as argon2 from 'argon2';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async createUser(createUserDto: CreateUserDto) {
        const { email, password } = createUserDto;

        const existUser = await this.prisma.user.findFirst({
            where: { email },
        });

        if (existUser) {
            throw new HttpException(
                'This email is already use',
                HttpStatus.UNPROCESSABLE_ENTITY,
            );
        }

        const hashPassword = await argon2.hash(password);

        const user = await this.prisma.user.create({
            data: { email, password: hashPassword },
        });

        delete user.password;
        delete user.role;

        return user;
    }

    async findOne(email: string): Promise<User | undefined> {
        return await this.prisma.user.findFirst({ where: { email } });
    }
}
