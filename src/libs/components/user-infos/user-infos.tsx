"use server";

import { capitalize, getUserInfo, memberSince } from "@/libs/utils";
import classes from "./user-infos.module.css";

export interface UserInfosProps {
  userId: string;
}

export const UserInfos = async ({ userId }: UserInfosProps) => {
  const user = await getUserInfo(userId);

  if (user && user.username) {
    const name = capitalize(user.username);
    const since = memberSince(user.createdAt);
    return (
      <div className={classes.userInfosWrapper}>
        <h1>{name}</h1>
        <p>member since {since}</p>
      </div>
    );
  }
};
