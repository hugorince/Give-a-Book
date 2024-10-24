"use client";

import type { BookPageData } from "@/types";
import { Button, useDialog } from "@/ui-kit";
import { RequestBookDialog } from "../request-book-dialog";
import { requestBook } from "@/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TOASTER_GENERIC_ERROR_MESSAGE } from "@/constants";

interface RequestBookProps {
  book: BookPageData;
}

export const RequestBookButton = ({ book }: RequestBookProps) => {
  const { openDialog, closeDialog } = useDialog();
  const router = useRouter();

  const proceed = async (message: string) => {
    closeDialog();
    try {
      await requestBook(book, message);
      router.refresh();
      toast.success("Your booking has been registered");
    } catch (err) {
      toast.error(TOASTER_GENERIC_ERROR_MESSAGE);
    }
  };

  const openRequestBookDialog = () => {
    openDialog({
      children: <RequestBookDialog proceed={proceed} user={book.username} />,
    });
  };

  return <Button onClick={openRequestBookDialog}>Request book</Button>;
};
