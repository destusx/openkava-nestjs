/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `posts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `content` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "language" "Language" NOT NULL DEFAULT 'UK';

-- CreateIndex
CREATE UNIQUE INDEX "posts_title_key" ON "posts"("title");
