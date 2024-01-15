/*
  Warnings:

  - You are about to drop the column `imageId` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `imageId` on the `projects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "imageId";

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "imageId";
