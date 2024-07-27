"use server";

import { db } from "@/db";

export const updateNotificationVisibility = async (notificationId: number) => {
  await db.notification.update({
    where: { id: notificationId },
    data: {
      isRead: true,
    },
  });
};
