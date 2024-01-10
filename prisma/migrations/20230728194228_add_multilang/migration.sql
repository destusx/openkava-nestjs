-- CreateEnum
CREATE TYPE "Language" AS ENUM ('UK', 'RU');

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "language" "Language" NOT NULL DEFAULT 'UK';

-- AlterTable
ALTER TABLE "menu" ADD COLUMN     "language" "Language" NOT NULL DEFAULT 'UK';
