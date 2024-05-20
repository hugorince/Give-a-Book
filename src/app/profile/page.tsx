import { ProfileInfos, UserBooksCardsContainer } from "@/libs/components";
import { MainLayout } from "@/libs/layout";
import { getConnectedUserId } from "@/libs/database";

export const Profile = async () => {
  const userId = await getConnectedUserId();

  return (
    <MainLayout>
      <ProfileInfos />
      {userId && <UserBooksCardsContainer userId={userId} />}
    </MainLayout>
  );
};

export default Profile;
