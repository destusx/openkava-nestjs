-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_postId_fkey";

-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_projectId_fkey";

-- AlterTable
ALTER TABLE "images" ALTER COLUMN "postId" DROP NOT NULL,
ALTER COLUMN "projectId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;
