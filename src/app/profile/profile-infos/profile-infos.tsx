"use client";

import { useSession } from "next-auth/react";
import { ProfileInfoContainer } from "./profile-infos-container";

export const ProfileInfos = () => {
  const { data: session, update } = useSession();
  return (
    <div>
      <h1>Welcome {session?.user.username}</h1>
      <h2>your information</h2>
      <ProfileInfoContainer type="username" />
      <ProfileInfoContainer type="email" />
    </div>
  );
};
