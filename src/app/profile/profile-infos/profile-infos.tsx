import { ProfileTitle } from "./profile-title/profile-title";
import { UpdateProfileInfoContainer } from "./update-profile-infos-container";

export const ProfileInfos = () => {
  return (
    <div>
      <ProfileTitle />
      <UpdateProfileInfoContainer type="username" />
      <UpdateProfileInfoContainer type="email" />
    </div>
  );
};
