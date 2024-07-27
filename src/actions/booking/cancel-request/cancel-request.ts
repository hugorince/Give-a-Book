"use server";

import { getConnectedUserId } from "@/actions/user";
import { db } from "@/db";

export const cancelRequest = async (bookId: number) => {
  const userId = await getConnectedUserId();

  if (!userId) return null;

  try {
    const booking = await db.booking.findFirst({
      where: { bookId: bookId },
    });

    if (!booking) return null;

    await db.booking.delete({
      where: { id: booking.id },
    });
  } catch (err) {
    console.error(err);
  }
};
