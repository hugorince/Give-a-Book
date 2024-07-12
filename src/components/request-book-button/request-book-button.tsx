"use client";

import type { BookPageData } from "@/types";
import { Button, useDialog } from "@/ui-kit";
import { RequestBookDialog } from "../request-book-dialog";
import { requestBook } from "@/actions";
import { useRouter } from "next/navigation";

interface RequestBookProps {
  book: BookPageData;
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
      children: <RequestBookDialog proceed={proceed} user={book.username} />,
      onClose: () => console.log("fired"),
    });
  };

  return <Button onClick={openRequestBookDialog}>Request book</Button>;
};
