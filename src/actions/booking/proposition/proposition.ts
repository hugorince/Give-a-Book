"use server";

import { getBookById, getBooksByUserId } from "../../book/get-books-data";
import { getConnectedUserId } from "../../user";
import { db } from "@/db";
import { BookPageData } from "@/types";

export const proposeExchange = async (
  requestedBook: BookPageData,
  proposedBookId: number,
) => {
  try {
    await db.proposition.create({
      data: {
        status: "PENDING",
        proposedBookId: proposedBookId,
        receiverBookId: requestedBook.id,
      },
    });

    await db.notification.create({
      data: {
        userId: requestedBook.userId,
        type: "PROPOSITION",
        isRead: false,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const getUserPropositions = async () => {
  try {
    const userId = await getConnectedUserId();
    if (!userId) return null;

    const userBooks = await getBooksByUserId(userId);
    if (!userBooks) return null;

    const booksAskedForExchange = await Promise.all(
      userBooks
        .filter((book) => book.proposed)
        .map(async (book) => {
          if (!book.proposed) return null;
          const proposedBookInExchange = await getBookById(
            book.proposed.receiverBookId,
          );
          if (!proposedBookInExchange) return null;

          return {
            ownedBook: book,
            proposedInExchange: proposedBookInExchange,
          };
        }),
    );

    const booksExchangePropositionReceived = await Promise.all(
      userBooks
        .filter((book) => book.propositionReceived)
        .map(async (book) => {
          if (!book.propositionReceived) return null;
          const proposedBookInExchange = await getBookById(
            book.propositionReceived.proposedBookId,
          );
          if (!proposedBookInExchange) return null;

          return {
            ownedBook: book,
            proposedInExchange: proposedBookInExchange,
          };
        }),
    );

    return {
      booksAskedForExchange,
      booksExchangePropositionReceived,
    };
  } catch (error) {
    console.error("Error fetching user propositions:", error);
  }
};

export const deleteProposition = async (propositionId: number) => {
  if (!propositionId) return null;

  await db.proposition.delete({
    where: { id: propositionId },
  });
};
