import type { User } from "@prisma/client";
import { capitalize, memberSince } from "@/utils";
import { UpdateProfileInfoContainer } from "../update-profile-infos-container";
import classes from "./profile.infos.module.css";

interface ProfileInfosProps {
  userInfos: User;
}

export const ProfileInfos = ({ userInfos }: ProfileInfosProps) => {
  const memberSinceDate = memberSince(userInfos.createdAt);

  const capitalizeUsername =
    userInfos.username && capitalize(userInfos.username);

  return (
    <div className={classes.wrapper}>
      <h1>Welcome {capitalizeUsername}</h1>
      <p>member since {memberSinceDate}</p>
      <div className={classes.updateFields}>
        <UpdateProfileInfoContainer userInfos={userInfos} type="username" />
        <UpdateProfileInfoContainer userInfos={userInfos} type="email" />
        <UpdateProfileInfoContainer userInfos={userInfos} type="postalCode" />
      </div>
    </div>
  );
};
