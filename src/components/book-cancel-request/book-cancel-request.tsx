import type { BookPageData } from "@/types";
import { RxQuestionMarkCircled } from "react-icons/rx";
import classes from "./book-cancel-request.module.css";
import { CancelRequestBookButton } from "../cancel-book-request-button";
import { DeleteBook } from "../delete-book";

interface BookCancelRequestProps {
  book: BookPageData;
  withDeleteButton?: boolean;
}

export const BookCancelRequest = ({
  book,
  withDeleteButton,
}: BookCancelRequestProps) => {
  return (
    <div className={classes.bookCancelRequestWrapper}>
      <RxQuestionMarkCircled size={64} color="orange" />
      <p>You can cancel this request if you want</p>
      <div className={classes.actionsContainer}>
        <CancelRequestBookButton book={book} />
        {withDeleteButton && <DeleteBook bookId={book.id} />}
      </div>
    </div>
  );
};
