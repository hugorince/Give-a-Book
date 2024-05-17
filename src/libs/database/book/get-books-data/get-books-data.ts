"use server";

import type { BookData } from "@/libs/types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth/auth";
import { db } from "@/libs/database";
import { calculateDistance } from "@/libs/utils";

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

const getBooksData = async () => {
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

export const getBooksByUserId = async (userId: string) => {
  const books = await getBooksData();
  return books.filter((book) => book.userId === parseInt(userId));
};

export const getBooksWithoutConnectedUser = async () => {
  const books = await getBooksData();
  const sortedBooks = await sortBooksByPostalCode(books);
  return sortedBooks.filter((book) => book.id).sort((book) => book.id);
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

export const getUserRequestedBooks = async () => {
  const user = await getServerSession(authOptions);

  if (!user) return null;

  const requester = parseInt(user.user.id);
  const bookings = await db.booking.findMany();
  const books = await getBooksData();

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
      bookingId: booking.id,
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
  const books = await getBooksData();

  const userBookings = bookings.filter((booking) => booking.ownerId === userId);

  const userBookedBooks = userBookings.map((booking) => {
    const bookId = booking.bookId;
    const book = books.find((book) => book.id === bookId);

    if (!book) return null;
    return {
      ...book,
      distance: booking.distance,
      bookingId: booking.id,
    };
  });

  const filteredUserBookings = userBookedBooks.filter(
    (book): book is NonNullable<typeof book> => book !== undefined,
  );

  return filteredUserBookings;
};
