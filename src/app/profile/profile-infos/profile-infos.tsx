import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/auth/auth";

export const ProfileInfos = async () => {
  const session = await getServerSession(authOptions);
  return <h1>Welcome {session?.user.username}</h1>;
};
