"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth/auth";
import { db } from "../../db";

export const sendMessage = async (message: string, chatId: number) => {
  const user = await getServerSession(authOptions);

  if (!user) return null;

  const userId = parseInt(user.user.id);

  await db.message.create({
    data: {
      text: message,
      chatId: chatId,
      senderId: userId,
    },
  });
};
