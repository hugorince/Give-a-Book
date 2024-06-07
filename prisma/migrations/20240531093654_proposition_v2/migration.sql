/*
  Warnings:

  - You are about to drop the column `proposerId` on the `Proposition` table. All the data in the column will be lost.
  - You are about to drop the column `receieverId` on the `Proposition` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Proposition" DROP CONSTRAINT "Proposition_proposerId_fkey";

-- DropForeignKey
ALTER TABLE "Proposition" DROP CONSTRAINT "Proposition_receieverId_fkey";

-- AlterTable
ALTER TABLE "Proposition" DROP COLUMN "proposerId",
DROP COLUMN "receieverId";
