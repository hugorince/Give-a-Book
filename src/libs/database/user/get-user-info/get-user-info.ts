"use server";

import { authOptions } from "@/libs/auth/auth";
import { db } from "@/libs/database";
import { getServerSession } from "next-auth";

export const getUserInfo = async (userId: string) => {
  return await db.user.findUnique({
    where: { id: parseInt(userId) },
  });
};

export const getUserId = async () => {
  const user = await getServerSession(authOptions);
  return user?.user.id;
};
