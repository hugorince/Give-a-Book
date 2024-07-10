"use server";

import { authOptions } from "@/actions/auth/auth";
import { db } from "@/db";
import { getServerSession } from "next-auth";

export const getUserInfo = async (userId: number) => {
  return await db.user.findUnique({
    where: { id: userId },
  });
};

export const getConnectedUserId = async () => {
  const user = await getServerSession(authOptions);

  if (user) return parseInt(user.user?.id);
  return undefined;
};
