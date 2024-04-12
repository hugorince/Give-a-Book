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
  postalCode: string;
  requested: boolean;
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
  const userIds = books.map((book) => book.userId);

  const usersPromise = db.user.findMany({
    where: { id: { in: userIds } },
  });

  const bookingsPromise = db.booking.findMany({
    where: { bookId: { in: books.map((book) => book.id) } },
  });

  const [users, bookings] = await Promise.all([usersPromise, bookingsPromise]);

  const booksData = await Promise.all(
    books.map(async (book) => {
      const user = users.find((user) => user.id === book.userId);
      const requested = bookings.some((booking) => booking.bookId === book.id);

      return {
        id: book.id,
        title: book.title,
        author: book.author,
        image: book.image,
        description: book.description,
        user: user?.username || "",
        userId: book.userId,
        exchange: book.exchange,
        give: book.give,
        createdAt: book.createdAt,
        updatedAt: book.updatedAt,
        likes: book.likes,
        postalCode: user?.postalCode || "",
        requested: requested,
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

  const user = await db.user.findUnique({
    where: { id: book?.userId },
  });

  const requested = await db.booking.findFirst({
    where: { bookId: parseInt(bookId) },
  });

  if (book && user) {
    return {
      ...book,
      user: user.username,
      postalCode: user.postalCode,
      requested: requested ? true : false,
    };
  }
};

const sortBooksByPostalCode = async (books: BooksData[]) => {
  const user = await getServerSession(authOptions);

  if (!user) return books.sort((a, b) => b.id - a.id);

  const userData = await db.user.findUnique({
    where: { id: parseInt(user.user.id) },
  });

  if (!userData) return books.sort((a, b) => b.id - a.id);

  const userPostalCode = parseInt(userData.postalCode);

  const sortedBooks = books.sort((a, b) => {
    const userAPostalCode = parseInt(a.postalCode);
    const userBPostalCode = parseInt(b.postalCode);

    const differenceA = Math.abs(userAPostalCode - userPostalCode);
    const differenceB = Math.abs(userBPostalCode - userPostalCode);

    return differenceA - differenceB;
  });

  return sortedBooks.filter((book) => book.userId !== userData.id);
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

export const requestBook = async (book: BooksData, message: string) => {
  const user = await getServerSession(authOptions);

  if (!user) return null;

  const requester = await db.user.findUnique({
    where: { id: parseInt(user.user.id) },
  });

  if (!requester) return null;

  try {
    const newChat = await db.chat.create({
      data: {
        requesterId: requester.id,
        ownerId: book.userId,
      },
    });

    const newMessage = await db.message.create({
      data: {
        text: message,
        senderId: requester.id,
        chatId: newChat.id,
      },
    });

    const newBooking = await db.booking.create({
      data: {
        status: "requested",
        type: "REQUEST",
        requesterId: requester.id,
        ownerId: book.userId,
        bookId: book.id,
        chatId: newChat.id,
      },
    });
  } catch (err) {
    console.error(err);
  }
};
