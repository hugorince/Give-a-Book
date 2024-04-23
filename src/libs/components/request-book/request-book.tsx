"use client";

import { Button, useDialog } from "@/libs/ui-components";
import { RequestBookDialog } from "./request-book-dialog";
import { CancelRequestBookDialog } from "./cancel-request-book-dialog";
import { BooksData, cancelRequest, requestBook } from "@/libs/utils";
import classes from "./request-book.module.css";

interface RequestBookProps {
  book: BooksData;
}

export const RequestBook = ({ book }: RequestBookProps) => {
  const { openDialog, closeDialog } = useDialog();

  const proceed = async (message: string) => {
    await requestBook(book, message);
    closeDialog();
  };

  const openRequestBookDialog = () => {
    openDialog({
      children: <RequestBookDialog proceed={proceed} user={book.user} />,
      onClose: () => console.log("fired"),
    });
  };

  const handleCancelRequest = async () => {
    await cancelRequest(book);
  };

  const openCancelRequestDialog = () => {
    openDialog({
      children: <CancelRequestBookDialog cancelRequest={handleCancelRequest} />,
      onClose: () => console.log("fired"),
    });
  };

  return (
    <div className={classes.requestBookContainer}>
      {book.requested ? (
        <Button onClick={openCancelRequestDialog}>Cancel Request</Button>
      ) : (
        <Button onClick={openRequestBookDialog}>Request book</Button>
      )}
    </div>
  );
};
