"use client";

import { Button, useDialog } from "@/libs/ui-components";
import classes from "./delete-book-dialog.module.css";

interface DeleteBookDialogProps {
  handleDeleteBook: () => void;
}

export const DeleteBookDialog = ({
  handleDeleteBook,
}: DeleteBookDialogProps) => {
  const { closeDialog } = useDialog();

  return (
    <div className={classes.dialogContainer}>
      <h2>Are you sure you want to permanently delete this book ?</h2>
      <div className={classes.actionButtons}>
        <Button type="button" variant="secondary" onClick={closeDialog}>
          Cancel
        </Button>
        <Button onClick={handleDeleteBook}>Proceed</Button>
      </div>
    </div>
  );
};
