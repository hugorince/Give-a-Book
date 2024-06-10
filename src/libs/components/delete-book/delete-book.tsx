"use client";

import { Button, useDialog } from "@/libs/ui-components";
import { deleteBook } from "@/libs/server-actions";
import { DialogBox } from "../dialog-box";

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
      children: (
        <DialogBox
          cta={handleDeleteBook}
          label="Are you sure you want to permanently delete this book ?"
        />
      ),
      onClose: () => console.log("fired"),
    });
  };

  return (
    <Button onClick={openDeleteBookDialog} variant="secondary">
      Delete Book
    </Button>
  );
};
