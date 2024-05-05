-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_bookingId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_messageId_fkey";

-- AlterTable
ALTER TABLE "Notification" ALTER COLUMN "bookingId" DROP NOT NULL,
ALTER COLUMN "messageId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE SET NULL ON UPDATE CASCADE;
