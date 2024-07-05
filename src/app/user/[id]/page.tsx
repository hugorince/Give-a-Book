import type { PageProps } from "@/types";
import { UserBooksCardsContainer, UserInfos } from "@/components";
import { MainLayout } from "@/layout";

const UserPage = async ({ params }: PageProps) => {
  const userId = parseInt(params.id);

  return (
    <MainLayout>
      <UserInfos userId={userId} />
      <UserBooksCardsContainer userId={userId} />
    </MainLayout>
  );
};

export default UserPage;
