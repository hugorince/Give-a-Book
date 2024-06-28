"use client";

import type { BookedBook } from "@/types";
import { Button, useDialog } from "@/ui-kit";
import { RequestBookDialog } from "../request-book-dialog";
import { requestBook } from "@/actions";
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
    <>
      {book.requested ? (
        <CancelRequestBookButton book={book} />
      ) : (
        <Button onClick={openRequestBookDialog}>Request book</Button>
      )}
    </>
  );
};
