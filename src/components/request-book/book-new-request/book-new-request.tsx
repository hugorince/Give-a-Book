"use server";

import type { BookPageData } from "@/types";
import { FaRegCircleCheck } from "react-icons/fa6";
import { RequestBookButton } from "../request-book-button";
import classes from "./book-new-request.module.css";

interface BookNewRequestProps {
  book: BookPageData;
}

export const BookNewRequest = ({ book }: BookNewRequestProps) => {
  return (
    <div className={classes.bookNewRequestWrapper}>
      <FaRegCircleCheck size={64} color="green" />
      <p>This book is available to request</p>
      <RequestBookButton book={book} />
    </div>
  );
};
