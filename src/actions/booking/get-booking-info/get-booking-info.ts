"use server";

import { db } from "@/db";

export const getBookingInfos = async (bookingId: number) => {
  const booking = await db.booking.findUnique({
    where: { id: bookingId },
    include: { chat: true, book: true },
  });

  if (!booking || !booking.chat) return null;

  const chat = await db.chat.findUnique({
    where: { id: booking.chat.id },
    include: {
      messages: true,
    },
  });

  return {
    book: booking.book,
    booking: booking,
    messages: chat?.messages,
  };
};
