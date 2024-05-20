import { UserBooksCardsContainer } from "@/libs/components";
import { UserInfos } from "@/libs/components/user-infos/user-infos";
import { MainLayout } from "@/libs/layout";

export const UserPage = async ({ params }: { params: { id: string } }) => {
  const userId = parseInt(params.id);

  return (
    <MainLayout>
      <UserInfos userId={userId} />
      <UserBooksCardsContainer userId={userId} />
    </MainLayout>
  );
};

export default UserPage;
