import { Language } from '@prisma/client';

export class CreatePostDto {
    readonly title: string;
    readonly content: string;
    readonly image: string;
    readonly categories: number[];
    readonly language: Language;
}
