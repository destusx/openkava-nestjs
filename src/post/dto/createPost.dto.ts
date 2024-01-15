import { Image, Language } from '@prisma/client';

export class CreatePostDto {
    readonly title: string;
    readonly seoTitle: string;
    readonly description: string;
    readonly seoDescription: string;
    readonly content: string;
    readonly slug: string;
    readonly image: string;
    readonly categories: number[];
    readonly language: Language;
}
