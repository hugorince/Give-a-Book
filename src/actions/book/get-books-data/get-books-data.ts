"use server";

import { getConnectedUserId, getUserInfo } from "@/actions";
import { BOOK_TYPE, BOOKING_STATUS } from "@/constants";
import { db } from "@/db";
import { calculateDistance } from "@/utils";

export const getBookById = async (bookId: number) => {
  const book = await db.book.findUnique({
    where: { id: bookId },
    include: {
      booking: true,
      user: true,
      proposed: true,
      propositionReceived: true,
    },
  });

  if (!book) return null;

  return {
    ...book,
    exchange: book.type === BOOK_TYPE.EXCHANGE,
    give: book.type === BOOK_TYPE.GIVE,
    username: book.user.username,
    postalCode: book.user.postalCode,
    gpsCoordinates: book.user.gpsCoordinates,
    requested:
      book.booking && book?.booking?.status === BOOKING_STATUS.REQUESTED
        ? true
        : false,
    completed: book?.booking?.status === BOOKING_STATUS.COMPLETED,
  };
};

const getBooksData = async () => {
  const books = await db.book.findMany({
    include: { proposed: true, propositionReceived: true, booking: true },
  });

  const booksData = await Promise.all(
    books.map(async (book) => {
      const user = await getUserInfo(book.userId);
      const requested =
        book.booking && book?.booking?.status === BOOKING_STATUS.REQUESTED
          ? true
          : false;
      const completed = book?.booking?.status === BOOKING_STATUS.COMPLETED;

      return {
        id: book.id,
        title: book.title,
        author: book.author,
        image: book.image,
        description: book.description,
        username: user?.username || "",
        userId: book.userId,
        exchange: book.type === BOOK_TYPE.EXCHANGE,
        give: book.type === BOOK_TYPE.GIVE,
        createdAt: book.createdAt,
        updatedAt: book.updatedAt,
        likes: book.likes,
        postalCode: user?.postalCode || "",
        gpsCoordinates: user?.gpsCoordinates || [0, 0],
        requested: requested,
        completed: completed,
        proposed: book.proposed ? true : false,
        propositionReceived: book.propositionReceived ? true : false,
      };
    }),
  );

  return booksData;
};

export const getBooksWithoutConnectedUser = async () => {
  const books = await getBooksWithoutCompleted();
  const sortedBooks = await sortBooksByPostalCode(books);
  return sortedBooks.filter((book) => book.id);
};

const sortBooksByPostalCode = async (
  books: Awaited<ReturnType<typeof getBooksData>>,
) => {
  const userId = await getConnectedUserId();

  if (!userId) return books;

  const userData = await getUserInfo(userId);

  if (!userData) return books;

  const booksWithoutOwned = books.filter((book) => book.userId !== userData.id);

  const distancesPromises = booksWithoutOwned.map(async (book) => {
    const distance = await calculateDistance(
      book.gpsCoordinates,
      userData.gpsCoordinates,
    );
    return { ...book, distance };
  });

  const booksWithDistance = await Promise.all(distancesPromises);

  return booksWithDistance.sort((a, b) => a.distance - b.distance);
};

export const getConnectedUserBooks = async () => {
  const connectedUserId = await getConnectedUserId();

  if (!connectedUserId) return null;

  const books = await getBooksByUserId(connectedUserId);

  return books.filter(
    (book) => !book.booking && !book.proposed && !book.propositionReceived,
  );
};

export const getBooksByUserId = async (userId: number) => {
  const books = await db.book.findMany({
    where: {
      userId: {
        equals: userId,
      },
    },
    include: { booking: true, proposed: true, propositionReceived: true },
  });
  return books;
};

export const getBooksByUserIdLegacy = async (userId: number) => {
  const books = await getBooksData();
  return books.filter((book) => book.userId === userId);
};

export const getBooksWithoutCompleted = async () => {
  const books = await getBooksData();
  return books.filter((book) => !book.completed);
};
