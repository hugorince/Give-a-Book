import type { PageProps } from "@/types";
import { BookPageInfos, RequestBookContainer } from "@/components";
import { MainLayout } from "@/layout";
import { getBookById, getConnectedUserId, getUserInfo } from "@/actions";
import classes from "./book.module.css";
import { calculateDistance } from "@/utils";

const BookPage = async ({ params }: PageProps) => {
  const book = await getBookById(parseInt(params.id));

  if (!book) return null;

  const connectedUserId = await getConnectedUserId();

  const connectedUserInfos =
    connectedUserId && (await getUserInfo(connectedUserId));
  const ownerInfos = await getUserInfo(book.userId);

  const isOwnBook = Boolean(
    connectedUserInfos && connectedUserInfos?.id === ownerInfos?.id,
  );

  const getDistance = async () => {
    if (!connectedUserId || !connectedUserInfos || !ownerInfos || isOwnBook)
      return null;

    return await calculateDistance(
      connectedUserInfos?.gpsCoordinates,
      ownerInfos?.gpsCoordinates,
    );
  };

  const distance = await getDistance();

  return (
    <MainLayout>
      <div className={classes.pageWrapper}>
        <BookPageInfos
          book={book}
          connectedUserId={connectedUserId}
          distance={distance}
          isOwnBook={isOwnBook}
        />
        <RequestBookContainer book={book} connectedUserId={connectedUserId} />
      </div>
    </MainLayout>
  );
};

export default BookPage;
