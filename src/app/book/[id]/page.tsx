import type { PageProps } from "@/types";
import { BookPageInfos, RequestBookContainer } from "@/components";
import { MainLayout } from "@/layout";
import { getBookById, getConnectedUserId, getUserInfo } from "@/actions";
import { calculateDistance } from "@/utils";
import { Link } from "@/ui-kit";
import classes from "./book.module.css";

const BookPage = async ({ params }: PageProps) => {
  const bookId = parseInt(params.id);
  const book = await getBookById(bookId);

  const connectedUserId = await getConnectedUserId();

  const connectedUserInfos =
    connectedUserId && (await getUserInfo(connectedUserId));
  const ownerInfos = book && (await getUserInfo(book?.userId));

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
      {book ? (
        <div className={classes.pageWrapper}>
          <BookPageInfos
            book={book}
            connectedUserId={connectedUserId}
            distance={distance}
            isOwnBook={isOwnBook}
          />
          <RequestBookContainer book={book} connectedUserId={connectedUserId} />
        </div>
      ) : (
        <>
          <h1>Book not found</h1>
          <Link href="/" variant="unstyled">
            go to homepage
          </Link>
        </>
      )}
    </MainLayout>
  );
};

export default BookPage;
