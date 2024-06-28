import { BookPageInfos, RequestBookContainer } from "@/components";
import { MainLayout } from "@/layout";
import { getBookById, getConnectedUserId } from "@/actions";
import classes from "./book.module.css";

export const BookPage = async ({ params }: { params: { id: string } }) => {
  const book = await getBookById(parseInt(params.id));
  const connectedUserId = await getConnectedUserId();

  if (!book) return null;

  return (
    <MainLayout>
      <div className={classes.pageWrapper}>
        <BookPageInfos book={book} connectedUserId={connectedUserId} />
        <RequestBookContainer book={book} connectedUserId={connectedUserId} />
      </div>
    </MainLayout>
  );
};

export default BookPage;
