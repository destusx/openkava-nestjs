import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ImageService } from './image.service';
import { SetImageDto } from './dto/setImage.dto';

@Controller('image')
export class ImageController {
    constructor(private readonly imageService: ImageService) {}

    @Post()
    async setImage(@Body() setImageDto: SetImageDto) {
        return this.imageService.setImage(setImageDto);
    }

    @Get(':slug')
    async getPostBySlug(@Param('slug') slug: string) {
        return this.imageService.getImage(slug);
    }
}
