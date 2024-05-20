"use client";

import { Button, useDialog } from "@/libs/ui-components";
import { RequestBookDialog } from "../request-book-dialog";
import { CancelRequestBookDialog } from "../cancel-request-book-dialog";
import { cancelRequest, requestBook } from "@/libs/database";
import type { BookData, BookedBook } from "@/libs/types";
import { useRouter } from "next/navigation";

interface RequestBookProps {
  book: BookedBook & BookData;
}

export const RequestBookButton = ({ book }: RequestBookProps) => {
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
    await cancelRequest(book.id);
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
    <div>
      {book.requested ? (
        <Button onClick={openCancelRequestDialog}>Cancel Request</Button>
      ) : (
        <Button onClick={openRequestBookDialog}>Request book</Button>
      )}
    </div>
  );
};
