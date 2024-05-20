/*
  Warnings:

  - A unique constraint covering the columns `[bookId]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Booking_bookId_key" ON "Booking"("bookId");
