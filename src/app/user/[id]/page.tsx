import type { PageProps } from "@/types";
import { UserBooksCardsContainer, UserInfos } from "@/components";
import { MainLayout } from "@/layout";
import { getUserInfo } from "@/actions";
import { Link } from "@/ui-kit";

const UserPage = async ({ params }: PageProps) => {
  const userId = parseInt(params.id);
  const user = await getUserInfo(userId);

  return (
    <MainLayout>
      {user ? (
        <>
          <UserInfos user={user} />
          <UserBooksCardsContainer userId={userId} />
        </>
      ) : (
        <>
          <h1>User not found</h1>
          <Link href="/" variant="unstyled">
            go to homepage
          </Link>
        </>
      )}
    </MainLayout>
  );
};

export default UserPage;
