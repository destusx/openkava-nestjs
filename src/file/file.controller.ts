import {
    Controller,
    UploadedFile,
    UseInterceptors,
    Post,
    HttpStatus,
    Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { SetImageDto } from 'src/image/dto/setImage.dto';
import { ImageService } from 'src/image/image.service';
import { editFileName, imageFileFilter } from 'src/utils/file-upload.utils';

@Controller()
export class FileController {
    constructor(private readonly imageService: ImageService) {}
    @Post('uploads')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: 'uploads',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
            limits: { fileSize: 1024 * 1024 },
        }),
    )
    async uploadedFile(
        @UploadedFile() file: Express.Multer.File,
        @Body() body: { ruAlt: string; ukAlt: string },
    ) {
        const { ruAlt, ukAlt } = body;
        const setImageDto: SetImageDto = {
            filename: file.filename,
            ruAlt,
            ukAlt,
        };

        const image = await this.imageService.setImage(setImageDto);

        const response = {
            originalname: file.originalname,
            filename: file.filename,
            imageId: image.id,
        };

        return {
            status: HttpStatus.OK,
            message: 'Image uploaded successfully!',
            data: response,
        };
    }
}
