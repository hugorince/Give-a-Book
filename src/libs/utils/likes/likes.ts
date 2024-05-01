"use server";

import { authOptions } from "@/libs/auth/auth";
import { db } from "@/libs/database";
import { getServerSession } from "next-auth";

export const updateBookLikes = async (bookId: number) => {
  const session = await getServerSession(authOptions);

  if (!session) return null;

  const userId = parseInt(session.user.id);
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
