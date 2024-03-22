"use server";

import { authOptions } from "@/libs/auth/auth";
import { db } from "@/libs/database";
import { PostBookFormSchema } from "@/libs/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { z } from "zod";

export type BooksData = {
  id: number;
  title: string;
  author: string;
  image: string | null;
  description: string;
  user: string | null | undefined;
  userId: number;
  exchange: boolean;
  give: boolean;
  createdAt: Date;
  updatedAt: Date;
  likes: number[];
};

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

  const booksData = await Promise.all(
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
        userId: book.userId,
        exchange: book.exchange,
        give: book.give,
        createdAt: book.createdAt,
        updatedAt: book.updatedAt,
        likes: book.likes,
      };
    }),
  );

  return booksData;
};

export const getBooksWithoutConnectedUser = async () => {
  const books = await getBooksData();
  const sortedBooks = await sortBooksByPostalCode(books);
  return sortedBooks;
};

export const getBookByUserId = async (userId: string) => {
  const books = await getBooksData();
  return books.filter((book) => book.userId === parseInt(userId));
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

const redirectToBooks = (filter: string) => {
  const param = filter ? new URLSearchParams([["filter", filter]]) : "";
  redirect(`/books${param ? `?${param}` : ""}`);
};

export const filterBooks = async (formData: FormData) => {
  const exchange = formData.get("exchange");
  const give = formData.get("give");
  const liked = formData.get("liked");

  switch (true) {
    case exchange && !give && !liked:
      redirectToBooks("exchange");
      break;
    case give && !exchange && !liked:
      redirectToBooks("give");
      break;
    case liked && !exchange && !give:
      redirectToBooks("liked");
      break;
    case exchange && give && !liked:
      redirectToBooks("exchange,give");
      break;
    case exchange && liked && !give:
      redirectToBooks("exchange,liked");
      break;
    case liked && give && !exchange:
      redirectToBooks("liked,give");
      break;
    case liked !== null && give !== null && exchange !== null:
      redirectToBooks("liked,give,exchange");
      break;
    default:
      redirect("/books");
  }
};

const getBooksPostalCode = async (books: BooksData[]) => {
  return await Promise.all(
    books.map(async (book) => {
      const user = await db.user.findUnique({
        where: { id: book.userId },
      });
      return {
        ...book,
        postalCode: user?.postalCode || "",
      };
    }),
  );
};

const sortBooksByPostalCode = async (books: BooksData[]) => {
  const user = await getServerSession(authOptions);

  if (!user) return books.sort((a, b) => b.id - a.id);

  const userData = await db.user.findUnique({
    where: { id: parseInt(user.user.id) },
  });

  if (!userData) return books.sort((a, b) => b.id - a.id);

  const userPostalCode = parseInt(userData.postalCode);
  const booksWithPostalCode = await getBooksPostalCode(books);

  const sortedBooks = booksWithPostalCode.sort((a, b) => {
    const userAPostalCode = parseInt(a.postalCode);
    const userBPostalCode = parseInt(b.postalCode);

    const differenceA = Math.abs(userAPostalCode - userPostalCode);
    const differenceB = Math.abs(userBPostalCode - userPostalCode);

    return differenceA - differenceB;
  });

  return sortedBooks.filter((book) => book.userId !== userData.id);
};
