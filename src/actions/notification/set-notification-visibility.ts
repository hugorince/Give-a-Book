"use server";

import { db } from "@/db";

export const setNotificationVisibility = async (notificationId: number) => {
  await db.notification.update({
    where: { id: notificationId },
    data: {
      isRead: true,
    },
  });
};
