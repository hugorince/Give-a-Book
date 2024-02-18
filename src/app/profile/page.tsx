import { ProfileInfos } from "@/libs/components";
import { MainLayout } from "@/libs/layout";

export const Profile = async () => {
  return (
    <MainLayout>
      <ProfileInfos />
    </MainLayout>
  );
};

export default Profile;
