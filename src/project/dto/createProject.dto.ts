import { Language } from '@prisma/client';

export class CreateProjectDto {
    readonly title: string;
    readonly content: string;
    readonly image: string;
    readonly budget: number;
    readonly address: string;
    readonly openedData: Date;
    readonly floorArea: number;
    readonly language: Language;
}
