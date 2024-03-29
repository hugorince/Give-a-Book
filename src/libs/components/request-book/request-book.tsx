"use client";

import { Button, useDialog } from "@/libs/ui-components";
import { RequestBookDialog } from "./request-book-dialog";
import { BooksData, requestBook } from "@/libs/utils";

interface RequestBookProps {
  book: BooksData;
}

export const RequestBook = ({ book }: RequestBookProps) => {
  const { openDialog, closeDialog } = useDialog();

  const proceed = async () => {
    await requestBook(book);
    closeDialog();
  };

  const handleOnClick = () => {
    openDialog({
      children: <RequestBookDialog proceed={proceed} />,
      onClose: () => console.log("fired"),
    });
  };

  return <Button onClick={handleOnClick}>Request book</Button>;
};
