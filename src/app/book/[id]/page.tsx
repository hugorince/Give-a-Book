import { BookPageInfos, RequestBook } from "@/libs/components";
import { MainLayout } from "@/libs/layout";
import { getBookById, getConnectedUserId } from "@/libs/database";
import classes from "./book.module.css";

export const BookPage = async ({ params }: { params: { id: string } }) => {
  const book = await getBookById(parseInt(params.id));
  const connectedUserId = await getConnectedUserId();

  if (!book) return null;

  return (
    <MainLayout>
      <div className={classes.pageWrapper}>
        {book && (
          <>
            <BookPageInfos book={book} connectedUserId={connectedUserId} />
            <RequestBook book={book} />
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default BookPage;
