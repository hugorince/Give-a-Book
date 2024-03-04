"use server";

import { authOptions } from "@/libs/auth/auth";
import { db } from "@/libs/database";
import { getServerSession } from "next-auth";

export const updateBookLikes = async (bookId: number) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  const book = await db.book.findUnique({
    where: { id: bookId },
  });

  if (userId && book) {
    const alreadyLiked = book?.likes.includes(parseInt(userId));
    console.log("alreadyLiked", alreadyLiked);

    if (!alreadyLiked || !book.likes) {
      db.book.update({
        where: {
          id: bookId,
        },
        data: {
          likes: {
            push: parseInt(userId),
          },
        },
      });
    } else {
      const index = book.likes.indexOf(parseInt(userId));
      book.likes.splice(index, 1);

      db.book.update({
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
