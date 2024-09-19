import { capitalize, memberSince } from "@/utils";
import classes from "./user-infos.module.css";
import { User } from "@prisma/client";

export interface UserInfosProps {
  user: User;
}

export const UserInfos = ({ user }: UserInfosProps) => {
  const name = user?.username && capitalize(user.username);
  const since = memberSince(user.createdAt);

  return (
    <div className={classes.userInfosWrapper}>
      <h1>{name}</h1>
      <p>member since {since}</p>
    </div>
  );
};
