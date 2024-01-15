import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SetImageDto } from './dto/setImage.dto';

@Injectable()
export class ImageService {
    constructor(private prisma: PrismaService) {}

    async setImage(setImageDto: SetImageDto) {
        const { filename, ruAlt, ukAlt, postId, projectId } = setImageDto;

        const image = await this.prisma.image.create({
            data: {
                filename,
                ruAlt,
                ukAlt,
            },
        });

        return image;
    }

    async getImage(filename: string) {
        const image = await this.prisma.image.findFirst({
            where: { filename },
        });

        if (!image) {
            throw new HttpException(
                'Not found',
                HttpStatus.UNPROCESSABLE_ENTITY,
            );
        }

        return image;
    }
}
