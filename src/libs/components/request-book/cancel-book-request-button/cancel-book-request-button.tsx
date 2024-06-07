"use client";

import { cancelRequest } from "@/libs/server";
import { Button, useDialog } from "@/libs/ui-components";
import { useRouter } from "next/navigation";
import { CancelRequestBookDialog } from "../cancel-request-book-dialog";
import { BookPageData, BookedBook } from "@/libs/types";

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
  return (
    <div>
      <Button onClick={openCancelRequestDialog}>Cancel Request</Button>
    </div>
  );
};
