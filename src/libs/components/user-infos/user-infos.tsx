"use server";

import { capitalize, memberSince } from "@/libs/utils";
import { getUserInfo } from "@/libs/database";
import classes from "./user-infos.module.css";

export interface UserInfosProps {
  userId: number;
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
