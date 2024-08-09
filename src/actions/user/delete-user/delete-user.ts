"use server";

import { db } from "@/db";

export const deleteUser = async (userId: number) => {
  return await db.user.delete({
    where: { id: userId },
  });
};
