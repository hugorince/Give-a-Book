/*
  Warnings:

  - You are about to drop the column `authors` on the `Book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "authors",
ADD COLUMN     "author" TEXT;
