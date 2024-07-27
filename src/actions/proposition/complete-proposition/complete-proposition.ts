"use server";

import { db } from "@/db";
import { createBooking, requestBook } from "../../booking/request-book";
import { getBookById } from "@/actions/book/get-books-data";
import { PROPOSITION_STATUS_TYPE } from "@/constants";

export const completeProposition = async (
  propositionId: number,
  message: string,
) => {
  try {
    const proposition = await db.proposition.update({
      where: {
        id: propositionId,
      },
      data: {
        status: PROPOSITION_STATUS_TYPE.ACCEPTED,
      },
      include: {
        proposedBook: true,
        receiverBook: true,
      },
    });

    const receiverBookData = await getBookById(proposition.receiverBook.id);
    const proposedBookData = await getBookById(proposition.proposedBook.id);

    if (!receiverBookData || !proposedBookData) return null;

    await requestBook(proposedBookData, message);
    await createBooking(receiverBookData, proposedBookData.user);

    await db.proposition.delete({
      where: {
        id: proposition.id,
      },
    });
  } catch (err) {
    console.error(err);
  }
};
