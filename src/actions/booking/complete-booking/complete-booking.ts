"use server";

import { db } from "@/db";

export const completeBooking = async (bookingId: number) => {
  await db.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      status: "COMPLETED",
    },
  });
};
