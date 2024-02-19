"use server";

import { db } from "@/libs/database";
import { PostBookFormSchema } from "@/libs/types";
import { z } from "zod";

export const postBook = async (
  values: z.infer<typeof PostBookFormSchema>,
  userId: number,
) => {
  await db.book.create({
    data: {
      title: values.title,
      author: values.author,
      description: values.description,
      image: values.image,
      userId: userId as number,
    },
  });
};

export const getBooksData = async () => {
  const books = await db.book.findMany();

  return await Promise.all(
    books.map(async (book) => {
      const userName = await db.user.findUnique({
        where: { id: book.userId },
      });
      return {
        title: book.title,
        img: book.image,
        user: userName?.username,
        userId: userName?.id,
      };
    }),
  );
};

export type BooksData = Awaited<ReturnType<typeof getBooksData>>[number];
