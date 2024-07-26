"use server";

import { db } from "@/db";
import { getConnectedUserId } from "@/actions/user";
import { NOTIFICATION_TYPE } from "@/constants";

export const sendMessage = async (message: string, chatId: number) => {
  const userId = await getConnectedUserId();

  if (!userId) return null;

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

  await db.notification.create({
    data: {
      userId: userNotified,
      messageId: messageSent.id,
      type: NOTIFICATION_TYPE.MESSAGE,
      isRead: false,
      bookingId: chat.booking.id,
    },
  });
};
