"use client";

import { Button, useDialog } from "@/libs/ui-components";
import { RequestBookDialog } from "./request-book-dialog";
import { BooksData, requestBook } from "@/libs/utils";
import { useRouter } from "next/navigation";
import classes from "./request-book.module.css";

interface RequestBookProps {
  book: BooksData;
}

export const RequestBook = ({ book }: RequestBookProps) => {
  const { openDialog, closeDialog } = useDialog();
  const router = useRouter();

  const proceed = async (message: string) => {
    await requestBook(book, message);
    router.push("/books");
    closeDialog();
  };

  const handleOnClick = () => {
    openDialog({
      children: <RequestBookDialog proceed={proceed} user={book.user} />,
      onClose: () => console.log("fired"),
    });
  };

  return (
    <div className={classes.requestBookContainer}>
      {book.requested && <p>this book has already been requested</p>}
      <Button onClick={handleOnClick} disabled={book.requested}>
        Request book
      </Button>
    </div>
  );
};
