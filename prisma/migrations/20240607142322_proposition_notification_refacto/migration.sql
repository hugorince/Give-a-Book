/*
  Warnings:

  - A unique constraint covering the columns `[bookingId]` on the table `Notification` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[propositionId]` on the table `Notification` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "propositionId" INTEGER,
ALTER COLUMN "bookingId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Notification_bookingId_key" ON "Notification"("bookingId");

-- CreateIndex
CREATE UNIQUE INDEX "Notification_propositionId_key" ON "Notification"("propositionId");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_propositionId_fkey" FOREIGN KEY ("propositionId") REFERENCES "Proposition"("id") ON DELETE CASCADE ON UPDATE CASCADE;
