"use client";

import { completeBooking } from "@/actions";
import { Button } from "@/ui-kit";
import { useRouter } from "next/navigation";

interface CompleteBookingButtonProps {
  bookingId: number;
}

export const CompleteBookingButton = ({
  bookingId,
}: CompleteBookingButtonProps) => {
  const router = useRouter();

  const handleCompleteClick = async () => {
    await completeBooking(bookingId);
    router.refresh();
  };

  return <Button onClick={handleCompleteClick}>Complete</Button>;
};
