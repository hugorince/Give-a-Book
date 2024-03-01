"use server";

import { db } from "@/libs/database";
import { PostBookFormSchema } from "@/libs/types";
import { redirect } from "next/navigation";
import { z } from "zod";
import { revalidateTag } from "next/cache";

export const postBook = async (
  values: z.infer<typeof PostBookFormSchema>,
  userId: number,
) => {
  const exchange = values.exchangeGive === "exchange";

  await db.book.create({
    data: {
      title: values.title,
      author: values.author,
      description: values.description,
      image: values.image,
      userId: userId as number,
      exchange: exchange,
      give: !exchange,
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
        id: book.id,
        title: book.title,
        author: book.author,
        image: book.image,
        description: book.description,
        user: userName?.username,
        userId: userName?.id,
        exchange: book.exchange,
        give: book.give,
        createdAt: book.createdAt,
        updatedAt: book.updatedAt,
      };
    }),
  );
};

export const getBookById = async (bookId: string) => {
  const book = await db.book.findUnique({
    where: { id: parseInt(bookId) },
  });

  const userName = await db.user.findUnique({
    where: { id: book?.userId },
  });

  if (book && userName) {
    return {
      ...book,
      user: userName?.username,
    };
  }
};

export const filterBooks = async (formData: FormData) => {
  const exchange = formData.get("exchange");
  const give = formData.get("give");

  if (exchange && give) {
    const param = new URLSearchParams([["filter", "exchange,give"]]);
    redirect(`/books?${param}`);
  }
  if (exchange) {
    const param = new URLSearchParams([["filter", "exchange"]]);
    redirect(`/books?${param}`);
  }
  if (give) {
    const param = new URLSearchParams([["filter", "give"]]);
    redirect(`/books?${param}`);
  }

  if (!exchange && !give) {
    redirect("/books");
  }
};

export type BooksData = Awaited<ReturnType<typeof getBooksData>>[number];
