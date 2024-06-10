"use client";

import type { BookPageData, BookedBook } from "@/libs/types";
import { Button, useDialog } from "@/libs/ui-components";
import { RequestBookDialog } from "../request-book-dialog";
import { CancelRequestBookDialog } from "../cancel-request-book-dialog";
import { cancelRequest, requestBook } from "@/libs/server-actions";
import { useRouter } from "next/navigation";
import { CancelRequestBookButton } from "../cancel-book-request-button";

interface RequestBookProps {
  book: BookedBook;
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

  return (
    <div>
      {book.requested ? (
        <CancelRequestBookButton book={book} />
      ) : (
        <Button onClick={openRequestBookDialog}>Request book</Button>
      )}
    </div>
  );
};
