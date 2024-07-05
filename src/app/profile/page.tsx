import { ProfileInfos, UserBooksCardsContainer } from "@/components";
import { MainLayout } from "@/layout";
import { getConnectedUserId } from "@/actions";

const Profile = async () => {
  const userId = await getConnectedUserId();

  return (
    <MainLayout>
      <ProfileInfos />
      {userId && <UserBooksCardsContainer userId={userId} />}
    </MainLayout>
  );
};

export default Profile;
