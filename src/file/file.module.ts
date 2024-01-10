import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { ImageService } from 'src/image/image.service';
import { ImageModule } from 'src/image/image.module';
import { PrismaService } from 'src/prisma.service';

@Module({
    imports: [ImageModule],
    controllers: [FileController],
    providers: [ImageService, PrismaService],
})
export class FileModule {}
