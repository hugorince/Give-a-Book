"use client";

import { Button, useDialog } from "@/libs/ui-components";
import { BooksData, deleteBook } from "@/libs/utils";
import { DeleteBookDialog } from "./delete-book-dialog";

interface DeleteBookProps {
  book: BooksData;
}

export const DeleteBook = ({ book }: DeleteBookProps) => {
  const { openDialog, closeDialog } = useDialog();

  const handleDeleteBook = async () => {
    await deleteBook(book);
    closeDialog();
  };

  const openDeleteBookDialog = () => {
    openDialog({
      children: <DeleteBookDialog handleDeleteBook={handleDeleteBook} />,
      onClose: () => console.log("fired"),
    });
  };

  return (
    <Button onClick={openDeleteBookDialog} variant="secondary">
      Delete Book
    </Button>
  );
};
