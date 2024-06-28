"use client";

import { cancelRequest } from "@/actions";
import { Button, useDialog } from "@/ui-kit";
import { useRouter } from "next/navigation";
import { CancelRequestBookDialog } from "../cancel-request-book-dialog";
import { BookPageData, BookedBook } from "@/types";

interface CancelBookRequestButtonProps {
  book: BookedBook | BookPageData;
}

export const CancelRequestBookButton = ({
  book,
}: CancelBookRequestButtonProps) => {
  const { openDialog, closeDialog } = useDialog();
  const router = useRouter();

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
  return <Button onClick={openCancelRequestDialog}>Cancel Request</Button>;
};
