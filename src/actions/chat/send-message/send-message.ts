"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/actions/auth/auth";
import { db } from "@/db";

export const sendMessage = async (message: string, chatId: number) => {
  const user = await getServerSession(authOptions);

  if (!user) return null;

  const userId = parseInt(user.user.id);

  const chat = await db.chat.findUnique({
    where: { id: chatId },
    include: { booking: true },
  });

  if (!chat) return null;

  const userNotified =
    userId === chat.ownerId ? chat.requesterId : chat.ownerId;

  const messageSent = await db.message.create({
    data: {
      text: message,
      chatId: chatId,
      senderId: userId,
    },
  });

  const notification = await db.notification.create({
    data: {
      userId: userNotified,
      messageId: messageSent.id,
      type: "MESSAGE",
      isRead: false,
      bookingId: chat.booking.id,
    },
  });
};
