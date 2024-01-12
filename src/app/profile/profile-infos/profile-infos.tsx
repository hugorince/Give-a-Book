import { getServerSession } from "next-auth";
import { ProfileInfoContainer } from "./profile-infos-container";
import { authOptions } from "@/libs/auth/auth";

export const ProfileInfos = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <h1>Welcome {session?.user.username}</h1>
      <h2>your information</h2>
      <ProfileInfoContainer type="username" />
      <ProfileInfoContainer type="email" />
    </div>
  );
};
