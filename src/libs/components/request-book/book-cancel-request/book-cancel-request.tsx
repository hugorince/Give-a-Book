import { RxQuestionMarkCircled } from "react-icons/rx";
import { RequestBookButton } from "../request-book-button";
import { BookPageData } from "@/libs/types";
import classes from "./book-cancel-request.module.css";

interface BookCancelRequestProps {
  book: BookPageData;
}

export const BookCancelRequest = ({ book }: BookCancelRequestProps) => {
  return (
    <div className={classes.bookCancelRequestWrapper}>
      <RxQuestionMarkCircled size={64} color="orange" />
      <p>Your can cancel this request</p>
      <RequestBookButton book={book} />
    </div>
  );
};
