"use server";

import { getBooksByUserId } from "../../book/get-books-data";
import { getConnectedUserId } from "../../user";

export const getUserPropositions = async () => {
  const userId = await getConnectedUserId();

  if (!userId) return null;

  const userBooks = await getBooksByUserId(userId);

  if (!userBooks) return null;

  const propositionsReceived = userBooks.filter((book) => {
    if (book.propositionReceived.length > 0) {
      const exchangeProposed = book.propositionReceived[0];
    }
  });
  const proposed = userBooks.filter((book) => book.proposed.length > 0);

  return {
    propositionsReceived,
    proposed,
  };
};
