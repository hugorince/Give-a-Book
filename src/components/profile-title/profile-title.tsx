"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/actions/auth/auth";

export const ProfileTitle = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <h1>Welcome {session?.user.username}</h1>
      <h2>your information</h2>
    </div>
  );
};
