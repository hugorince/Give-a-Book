"use server";

import { authOptions } from "@/libs/auth/auth";
import { db } from "@/libs/database";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { calculateDistance } from "@/libs/utils";
import type { BookData } from "@/libs/types";

export const getBookData = async () => {
  const books = await db.book.findMany();
  const userIds = books.map((book) => book.userId);

  const usersPromise = db.user.findMany({
    where: { id: { in: userIds } },
  });

  const bookingsPromise = db.booking.findMany({
    where: { bookId: { in: books.map((book) => book.id) } },
  });

  const [users, bookings] = await Promise.all([usersPromise, bookingsPromise]);

  const BookData = await Promise.all(
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
        gpsCoordinates: user?.gpsCoordinates || [0, 0],
        requested: requested,
      };
    }),
  );

  return BookData;
};

export const getBooksWithoutConnectedUser = async () => {
  const books = await getBookData();
  console.log("books", books.length);
  const sortedBooks = await sortBooksByPostalCode(books);
  return sortedBooks.filter((book) => book.id);
};

const sortBooksByPostalCode = async (books: BookData[]) => {
  const user = await getServerSession(authOptions);

  if (!user) return books;

  const userData = await db.user.findUnique({
    where: { id: parseInt(user.user.id) },
  });

  if (!userData) return books;

  const removeUsersBooks = books.filter((book) => book.userId !== userData.id);

  const distancesPromises = removeUsersBooks.map(async (book) => {
    const distance = await calculateDistance(
      book.gpsCoordinates,
      userData.gpsCoordinates,
    );
    return { ...book, distance };
  });

  const booksWithDistance = await Promise.all(distancesPromises);

  return booksWithDistance.sort((a, b) => a.distance - b.distance);
};

export const getBookByUserId = async (userId: string) => {
  const books = await getBookData();
  return books.filter((book) => book.userId === parseInt(userId));
};

export const getBookById = async (bookId: number) => {
  const book = await db.book.findUnique({
    where: { id: bookId },
  });

  const user = await db.user.findUnique({
    where: { id: book?.userId },
  });

  const requested = await db.booking.findFirst({
    where: { bookId: bookId },
  });

  if (book && user) {
    return {
      ...book,
      user: user.username,
      postalCode: user.postalCode,
      gpsCoordinates: user.gpsCoordinates,
      requested: requested ? true : false,
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

export const getUserRequestedBooks = async () => {
  const user = await getServerSession(authOptions);

  if (!user) return null;

  const requester = parseInt(user.user.id);
  const bookings = await db.booking.findMany();
  const books = await getBookData();

  const userBookings = bookings.filter(
    (booking) => booking.requesterId === requester,
  );

  const userRequestedBooks = userBookings.map((booking) => {
    const bookId = booking.bookId;
    const book = books.find((book) => book.id === bookId);

    if (!book) return null;
    return {
      ...book,
      distance: booking.distance,
    };
  });

  const filteredUserRequestedBooks = userRequestedBooks.filter(
    (book): book is NonNullable<typeof book> => book !== undefined,
  );

  return filteredUserRequestedBooks;
};

export const getUserBookedBooks = async () => {
  const user = await getServerSession(authOptions);

  if (!user) return null;

  const userId = parseInt(user.user.id);
  const bookings = await db.booking.findMany();
  const books = await getBookData();

  const userBookings = bookings.filter((booking) => booking.ownerId === userId);

  const userBookedBooks = userBookings.map((booking) => {
    const bookId = booking.bookId;
    const book = books.find((book) => book.id === bookId);

    if (!book) return null;
    return {
      ...book,
      distance: booking.distance,
    };
  });

  const filteredUserBookings = userBookedBooks.filter(
    (book): book is NonNullable<typeof book> => book !== undefined,
  );

  return filteredUserBookings;
};
