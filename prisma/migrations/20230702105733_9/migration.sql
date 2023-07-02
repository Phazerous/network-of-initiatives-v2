/*
  Warnings:

  - The `status` column on the `Application` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Initiative` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Application" DROP COLUMN "status",
ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Initiative" DROP COLUMN "status",
ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 0;
