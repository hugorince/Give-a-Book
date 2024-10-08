"use client";

import { Button, useDialog } from "@/ui-kit";
import { deleteBook } from "@/actions";
import { DialogBox } from "../dialog-box";
import { toast } from "sonner";

interface DeleteBookProps {
  bookId: number;
}

export const DeleteBook = ({ bookId }: DeleteBookProps) => {
  const { openDialog, closeDialog } = useDialog();

  const handleDeleteBook = async () => {
    closeDialog();

    try {
      await deleteBook(bookId);
      toast.success("This book has been deleted");
    } catch (err) {
      toast.error("An error occurred");
    }
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
