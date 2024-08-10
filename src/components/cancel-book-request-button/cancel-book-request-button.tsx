"use client";

import { cancelRequest } from "@/actions";
import { Button, useDialog } from "@/ui-kit";
import { useRouter } from "next/navigation";
import { BookPageData, BookedBook } from "@/types";
import { DialogBox } from "../dialog-box";
import { toast } from "sonner";

interface CancelBookRequestButtonProps {
  book: BookedBook | BookPageData;
}

export const CancelRequestBookButton = ({
  book,
}: CancelBookRequestButtonProps) => {
  const { openDialog, closeDialog } = useDialog();
  const router = useRouter();

  const handleCancelRequest = async () => {
    closeDialog();

    try {
      await cancelRequest(book.id);
      router.refresh();
      toast.success("Booking successfully canceled");
    } catch (err) {
      toast.error("An error occurred");
    }
  };

  const openCancelRequestDialog = () => {
    openDialog({
      children: (
        <DialogBox
          cta={handleCancelRequest}
          label="Are you sure you want to cancel your request ?"
        />
      ),
      onClose: () => console.log("fired"),
    });
  };

  return <Button onClick={openCancelRequestDialog}>Cancel Request</Button>;
};
