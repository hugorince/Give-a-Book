"use server";

import { authOptions } from "@/libs/auth/auth";
import { getServerSession } from "next-auth";
import db from "../db";

export const getUserNotifications = async () => {
  const user = await getServerSession(authOptions);

  if (!user) return null;

  const userId = parseInt(user.user.id);

  const userData = await db.user.findUnique({
    where: { id: userId },
    include: { notifications: true },
  });

  return userData?.notifications;
};
