import { Image } from '@prisma/client';

export class UpdatePostDto {
    readonly title: string;
    readonly content: string;
    readonly image: Image;
}
