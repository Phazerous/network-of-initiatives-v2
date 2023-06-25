/*
  Warnings:

  - You are about to drop the column `code` on the `EmailVerificationCode` table. All the data in the column will be lost.
  - Added the required column `verificationCode` to the `EmailVerificationCode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EmailVerificationCode" DROP COLUMN "code",
ADD COLUMN     "verificationCode" TEXT NOT NULL;
