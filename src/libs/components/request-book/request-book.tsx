"use client";

import { Button, useDialog } from "@/libs/ui-components";
import { RequestBookDialog } from "./request-book-dialog";
import { CancelRequestBookDialog } from "./cancel-request-book-dialog";
import { cancelRequest, requestBook } from "@/libs/database";
import type { BookData } from "@/libs/types";
import classes from "./request-book.module.css";
import { useRouter } from "next/navigation";

interface RequestBookProps {
  book: BookData;
}

export const RequestBook = ({ book }: RequestBookProps) => {
  const { openDialog, closeDialog } = useDialog();
  const router = useRouter();

  const proceed = async (message: string) => {
    await requestBook(book, message);
    closeDialog();
    router.refresh();
  };

  const openRequestBookDialog = () => {
    openDialog({
      children: <RequestBookDialog proceed={proceed} user={book.user} />,
      onClose: () => console.log("fired"),
    });
  };

  const handleCancelRequest = async () => {
    await cancelRequest(book);
    closeDialog();
    router.refresh();
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
