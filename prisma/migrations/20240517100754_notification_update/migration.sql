/*
  Warnings:

  - Made the column `bookingId` on table `Notification` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_bookingId_fkey";

-- AlterTable
ALTER TABLE "Notification" ALTER COLUMN "bookingId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
