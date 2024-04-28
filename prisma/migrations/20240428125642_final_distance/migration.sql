/*
  Warnings:

  - Made the column `distance` on table `Booking` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Booking" ALTER COLUMN "distance" SET NOT NULL;
