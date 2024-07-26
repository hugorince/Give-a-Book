"use server";

import { BOOKING_STATUS } from "@/constants";
import { db } from "@/db";

export const completeBooking = async (bookingId: number) => {
  await db.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      status: BOOKING_STATUS.COMPLETED,
    },
  });
};
