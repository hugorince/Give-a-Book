"use server";

import type { BookPageData } from "@/types";
import { NOTIFICATION_TYPE, PROPOSITION_STATUS_TYPE } from "@/constants";
import { db } from "@/db";

export const proposeExchange = async (
  requestedBook: BookPageData,
  proposedBookId: number,
) => {
  try {
    await db.proposition.create({
      data: {
        status: PROPOSITION_STATUS_TYPE.PENDING,
        proposedBookId: proposedBookId,
        receiverBookId: requestedBook.id,
      },
    });

    await db.notification.create({
      data: {
        userId: requestedBook.userId,
        type: NOTIFICATION_TYPE.PROPOSITION,
        isRead: false,
      },
    });
  } catch (err) {
    console.error(err);
  }
};
