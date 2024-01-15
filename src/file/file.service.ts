import { HttpStatus, Injectable } from '@nestjs/common';
import { ImageService } from 'src/image/image.service';
import { UploadImageDto } from './dto/uploadImage.dto';
import { SetImageDto } from 'src/image/dto/setImage.dto';

@Injectable()
export class FileService {
    constructor(private readonly imageService: ImageService) {}
    async uploadedFile(
        file: Express.Multer.File,
        uploadImageDto: UploadImageDto,
    ) {
        const { ruAlt, ukAlt } = uploadImageDto;
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
