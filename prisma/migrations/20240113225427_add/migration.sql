/*
  Warnings:

  - A unique constraint covering the columns `[seoTitle]` on the table `posts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seoDescription` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seoTitle` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "seoDescription" TEXT NOT NULL,
ADD COLUMN     "seoTitle" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "posts_seoTitle_key" ON "posts"("seoTitle");
