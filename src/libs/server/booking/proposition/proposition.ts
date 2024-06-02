"use server";

import { getBookById, getBooksByUserId } from "../../book/get-books-data";
import { getConnectedUserId } from "../../user";
import db from "../../db";

export const proposeExchange = async (
  requestedBookId: number,
  proposedBookId: number,
) => {
  try {
    await db.proposition.create({
      data: {
        status: "PENDING",
        proposedBookId: proposedBookId,
        receiverBookId: requestedBookId,
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
        .filter((book) => book.proposed.length > 0)
        .map(async (book) => {
          const proposedBookInExchange = await getBookById(
            book.proposed[0].receiverBookId,
          );
          return {
            ownedBook: book,
            proposedInExchange: proposedBookInExchange,
          };
        }),
    );

    return {
      booksAskedForExchange,
    };
  } catch (error) {
    console.error("Error fetching user propositions:", error);
    return null;
  }
};
