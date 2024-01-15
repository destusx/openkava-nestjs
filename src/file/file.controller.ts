import {
    Controller,
    UploadedFile,
    UseInterceptors,
    Post,
    Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/utils/file-upload.utils';
import { FileService } from './file.service';
import { UploadImageDto } from './dto/uploadImage.dto';

@Controller()
export class FileController {
    constructor(private readonly fileService: FileService) {}
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
        @Body() uploadImageDto: UploadImageDto,
    ) {
        return this.fileService.uploadedFile(file, uploadImageDto);
    }
}
