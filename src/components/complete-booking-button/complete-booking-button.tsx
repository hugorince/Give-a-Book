"use client";

import { completeBooking } from "@/actions";
import { Button, useDialog } from "@/ui-kit";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DialogBox } from "../dialog-box";

interface CompleteBookingButtonProps {
  bookingId: number;
}

export const CompleteBookingButton = ({
  bookingId,
}: CompleteBookingButtonProps) => {
  const { openDialog, closeDialog } = useDialog();
  const router = useRouter();

  const openCompleteBookingDialog = () => {
    openDialog({
      children: (
        <DialogBox
          cta={handleCompleteClick}
          label="Are you sure you want to complete this booking ?"
        />
      ),
    });
  };

  const handleCompleteClick = async () => {
    closeDialog();
    try {
      await completeBooking(bookingId);
      router.refresh();
      toast.success(
        "The booking has been completed and removed from selection",
      );
    } catch (err) {
      toast.error("An error occurred");
    }
  };

  return <Button onClick={openCompleteBookingDialog}>Complete</Button>;
};
