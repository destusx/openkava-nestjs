/*
  Warnings:

  - You are about to drop the `post_translations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "post_translations" DROP CONSTRAINT "post_translations_postId_fkey";

-- DropTable
DROP TABLE "post_translations";
