"use client";

import { Button, useDialog } from "@/libs/ui-components";
import { deleteBook } from "@/libs/server";
import { DeleteBookDialog } from "./delete-book-dialog";

interface DeleteBookProps {
  bookId: number;
}

export const DeleteBook = ({ bookId }: DeleteBookProps) => {
  const { openDialog, closeDialog } = useDialog();

  const handleDeleteBook = async () => {
    await deleteBook(bookId);
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
