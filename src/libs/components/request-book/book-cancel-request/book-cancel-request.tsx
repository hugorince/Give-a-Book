"use server";

import type { BookPageData } from "@/libs/types";
import { RxQuestionMarkCircled } from "react-icons/rx";
import classes from "./book-cancel-request.module.css";
import { CancelRequestBookButton } from "../cancel-book-request-button";

interface BookCancelRequestProps {
  book: BookPageData;
}

export const BookCancelRequest = ({ book }: BookCancelRequestProps) => {
  return (
    <div className={classes.bookCancelRequestWrapper}>
      <RxQuestionMarkCircled size={64} color="orange" />
      <p>You can cancel this request if you want</p>
      <div>
        <CancelRequestBookButton book={book} />
      </div>
    </div>
  );
};
