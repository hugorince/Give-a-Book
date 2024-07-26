/*
  Warnings:

  - You are about to drop the column `exchange` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `give` on the `Book` table. All the data in the column will be lost.
  - Made the column `type` on table `Book` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "exchange",
DROP COLUMN "give",
ALTER COLUMN "type" SET NOT NULL;
