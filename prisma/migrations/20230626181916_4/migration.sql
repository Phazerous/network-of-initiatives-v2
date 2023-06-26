/*
  Warnings:

  - Added the required column `status` to the `Initiative` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Initiative" ADD COLUMN     "status" TEXT NOT NULL;
