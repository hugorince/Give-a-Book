import { ProfileInfos, UserBooksCardsContainer } from "@/components";
import { MainLayout } from "@/layout";
import { getConnectedUserId, getUserInfo } from "@/actions";
import classes from "./page.module.css";

const Profile = async () => {
  const userId = await getConnectedUserId();
  const userInfos = userId && (await getUserInfo(userId));

  return (
    <MainLayout>
      <div className={classes.pageContainer}>
        {userInfos && <ProfileInfos userInfos={userInfos} />}
        <div className={classes.booksContainer}>
          <h2>The books you are proposing</h2>
          {userId && <UserBooksCardsContainer userId={userId} />}
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
