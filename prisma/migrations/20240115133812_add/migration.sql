/*
  Warnings:

  - Added the required column `floorArea` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "floorArea" INTEGER NOT NULL;
