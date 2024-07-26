"use server";

import { getConnectedUserId } from "@/actions/user";
import { db } from "@/db";

export const updateBookLikes = async (bookId: number) => {
  const userId = await getConnectedUserId();

  if (!userId) return null;

  const book = await db.book.findUnique({
    where: { id: bookId },
  });

  if (userId && book) {
    const alreadyLiked = book.likes.includes(userId);

    if (!alreadyLiked || !book.likes) {
      await db.book.update({
        where: {
          id: bookId,
        },
        data: {
          likes: {
            push: userId,
          },
        },
      });
    } else {
      const index = book.likes.indexOf(userId);
      book.likes.splice(index, 1);

      await db.book.update({
        where: {
          id: bookId,
        },
        data: {
          likes: book.likes,
        },
      });
    }
  }
};
