"use server";

import { getConnectedUserId, getUserInfo } from "@/actions/user";
import { db } from "@/db";

export const getBookingInfos = async (bookingId: number) => {
  const connectedUserId = await getConnectedUserId();

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

  const userChat =
    booking.ownerId === connectedUserId ? booking.requesterId : booking.ownerId;

  const userChatUserName = await getUserInfo(userChat);

  return {
    book: booking.book,
    booking: booking,
    messages: chat?.messages,
    userChat: {
      id: userChatUserName?.id,
      username: userChatUserName?.username,
    },
  };
};
