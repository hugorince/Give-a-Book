-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_bookingId_fkey";

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;
