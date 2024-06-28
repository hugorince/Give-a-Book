import { UserBooksCardsContainer, UserInfos } from "@/components";
import { MainLayout } from "@/layout";

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
