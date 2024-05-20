"use server";

import type { BookPageData } from "@/libs/types";
import { RxQuestionMarkCircled } from "react-icons/rx";
import { RequestBookButton } from "../request-book-button";
import classes from "./book-cancel-request.module.css";

interface BookCancelRequestProps {
  book: BookPageData;
}

export const BookCancelRequest = ({ book }: BookCancelRequestProps) => {
  return (
    <div className={classes.bookCancelRequestWrapper}>
      <RxQuestionMarkCircled size={64} color="orange" />
      <p>You can cancel this request if you want</p>
      <RequestBookButton book={book} />
    </div>
  );
};
