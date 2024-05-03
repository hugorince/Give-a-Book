"use client";

import { Button, useDialog } from "@/libs/ui-components";
import type { BookData } from "@/libs/types";
import { deleteBook } from "@/libs/database";
import { DeleteBookDialog } from "./delete-book-dialog";

interface DeleteBookProps {
  book: BookData;
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
