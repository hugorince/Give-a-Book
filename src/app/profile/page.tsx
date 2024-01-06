import { ProfileInfos } from "./profile-infos/profile-infos";
import { UpdateProfileContainer } from "./update-profile/update-profile-container";

export const Profile = () => {
  return (
    <>
      <ProfileInfos />
      <UpdateProfileContainer />
    </>
  );
};

export default Profile;
