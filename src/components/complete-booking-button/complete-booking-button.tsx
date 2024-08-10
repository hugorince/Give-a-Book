"use client";

import { completeBooking } from "@/actions";
import { Button } from "@/ui-kit";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface CompleteBookingButtonProps {
  bookingId: number;
}

export const CompleteBookingButton = ({
  bookingId,
}: CompleteBookingButtonProps) => {
  const router = useRouter();

  const handleCompleteClick = async () => {
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

  return <Button onClick={handleCompleteClick}>Complete</Button>;
};
