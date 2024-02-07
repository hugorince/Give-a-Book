import { ProfileTitle } from "./profile-title/profile-title";
import { UpdateProfileInfoContainer } from "./update-profile-infos-container";
import classes from "./profile.infos.module.css";

export const ProfileInfos = () => {
  return (
    <div className={classes.wrapper}>
      <ProfileTitle />
      <UpdateProfileInfoContainer type="username" />
      <UpdateProfileInfoContainer type="email" />
    </div>
  );
};
