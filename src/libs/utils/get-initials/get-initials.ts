"use server";

import { authOptions } from "@/libs/auth/auth";
import { getServerSession } from "next-auth";

export const getInitials = async () => {
  const session = await getServerSession(authOptions);
  return session?.user.username.charAt(0).toLocaleUpperCase();
};
