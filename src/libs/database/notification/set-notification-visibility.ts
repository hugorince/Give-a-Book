"use server";

import db from "../db";

export const setNotificationVisibility = async (notificationId: number) => {
  const notification = await db.notification.update({
    where: { id: notificationId },
    data: {
      isRead: true,
    },
  });
};
