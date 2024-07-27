"use server";

import { getBookById, getBooksByUserId } from "@/actions/book";
import { getConnectedUserId } from "@/actions/user";

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