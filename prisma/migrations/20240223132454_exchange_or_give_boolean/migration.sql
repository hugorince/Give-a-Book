/*
  Warnings:

  - You are about to drop the column `exchangegive` on the `Book` table. All the data in the column will be lost.
  - Added the required column `exchange` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `give` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Made the column `author` on table `Book` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "exchangegive",
ADD COLUMN     "exchange" BOOLEAN NOT NULL,
ADD COLUMN     "give" BOOLEAN NOT NULL,
ALTER COLUMN "author" SET NOT NULL;
