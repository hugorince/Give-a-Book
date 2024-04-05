import { BookPageInfos, RequestBook } from "@/libs/components";
import { MainLayout } from "@/libs/layout";
import { type BooksData, getBookById } from "@/libs/utils";
import classes from "./book.module.css";

export const BookPage = async ({ params }: { params: { id: string } }) => {
  const book: BooksData | undefined = await getBookById(params.id);

  if (!book) return <div>No book found</div>;

  return (
    <MainLayout>
      <div className={classes.pageWrapper}>
        {book && (
          <>
            <BookPageInfos book={book} />
            <RequestBook book={book} />
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default BookPage;
