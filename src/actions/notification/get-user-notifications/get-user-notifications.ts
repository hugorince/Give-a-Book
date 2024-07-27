"use server";

import { db } from "@/db";
import { Notification } from "@prisma/client";
import { NOTIFICATION_TYPE } from "@/constants";
import { getConnectedUserId } from "@/actions/user";

export const getUserNotifications = async () => {
  const userId = await getConnectedUserId();

  if (!userId) return null;

  const userData = await db.user.findUnique({
    where: { id: userId },
    include: { notifications: true },
  });

  if (!userData) return null;

  const notifications = Promise.all(
    userData.notifications
      .map(async (notification) => await getNotificationDetails(notification))
      .reverse(),
  );

  notifications.then((resolvedNotifications) => {
    resolvedNotifications.sort((a, b) => {
      if (a.isRead === b.isRead) {
        return 0;
      }
      return a.isRead ? 1 : -1;
    });
  });

  return notifications;
};

const getNotificationDetails = async (notification: Notification) => {
  if (
    notification.messageId &&
    notification.type === NOTIFICATION_TYPE.MESSAGE
  ) {
    const message = await db.message.findUnique({
      where: {
        id: notification.messageId,
      },
      include: { sender: true, chat: true },
    });

    if (message)
      return {
        ...notification,
        username: message.sender.username,
      };
  }

  return {
    id: notification.id,
    bookingId: notification.bookingId,
    isRead: notification.isRead,
    type: notification.type,
    createdAt: notification.createdAt,
  };
};
