"use server";

import db from "../../db";

export const getBookingInfos = async (bookingId: number) => {
  const booking = await db.booking.findUnique({
    where: { id: bookingId },
  });

  if (!booking) return null;

  const book = await db.book.findUnique({
    where: { id: booking.bookId },
  });

  if (!booking.chatId) return null;

  const chat = await db.chat.findUnique({
    where: { id: booking.chatId },
    include: {
      messages: true,
    },
  });

  return {
    book: book,
    booking: booking,
    messages: chat?.messages,
  };
};
