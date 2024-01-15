/*
  Warnings:

  - You are about to drop the column `image` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `projects` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[postId]` on the table `images` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[projectId]` on the table `images` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `postId` to the `images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageId` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageId` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "images" ADD COLUMN     "postId" INTEGER NOT NULL,
ADD COLUMN     "projectId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "image",
ADD COLUMN     "imageId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "image",
ADD COLUMN     "imageId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "images_postId_key" ON "images"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "images_projectId_key" ON "images"("projectId");

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
