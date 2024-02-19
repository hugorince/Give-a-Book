"use server";

import { db } from "@/libs/database";

export const getUserInfo = async (userId: string) => {
  return await db.user.findUnique({
    where: { id: parseInt(userId) },
  });
};
