"use server";

import { authOptions } from "@/libs/auth/auth";
import { getServerSession } from "next-auth";
import db from "../db";
import { Notification } from "@prisma/client";

export const getUserNotifications = async () => {
  const user = await getServerSession(authOptions);

  if (!user) return null;

  const userId = parseInt(user.user.id);

  const userData = await db.user.findUnique({
    where: { id: userId },
    include: { notifications: true },
  });

  if (!userData) return null;

  return Promise.all(
    userData.notifications.map(
      async (notification) => await getNotificationDetails(notification),
    ),
  );
};

const getNotificationDetails = async (notification: Notification) => {
  if (notification.messageId && notification.type === "MESSAGE") {
    const chat = await db.message.findUnique({
      where: {
        id: notification.messageId,
      },
      include: { sender: true },
    });

    if (chat)
      return {
        username: chat.sender.username,
        chatId: chat.id,
      };
  }
};
