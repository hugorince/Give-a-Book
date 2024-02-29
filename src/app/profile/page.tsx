import { ProfileInfos, UserBooksCardsWrapper } from "@/libs/components";
import { MainLayout } from "@/libs/layout";
import { getUserId } from "@/libs/utils";

export const Profile = async () => {
  const userId = await getUserId();

  return (
    <MainLayout>
      <ProfileInfos />
      {userId && <UserBooksCardsWrapper userId={userId} />}
    </MainLayout>
  );
};

export default Profile;
