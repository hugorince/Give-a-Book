"use server";

import { getConnectedUserId } from "@/actions";
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

  if (book) {
    return {
      ...book,
      user: book.user.username,
      postalCode: book.user.postalCode,
      gpsCoordinates: book.user.gpsCoordinates,
      requested: book.booking ? true : false,
      booking: book.booking,
      proposed: book.proposed,
      propositionReceived: book.propositionReceived,
    };
  }
};

const getBooksData = async () => {
  const books = await db.book.findMany({
    include: { proposed: true, propositionReceived: true },
  });
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
        proposed: book.proposed ? true : false,
        propositionReceived: book.propositionReceived ? true : false,
      };
    }),
  );

  return BookData;
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

export const getBooksWithoutConnectedUser = async () => {
  const books = await getBooksData();
  const sortedBooks = await sortBooksByPostalCode(books);
  return sortedBooks.filter((book) => book.id);
};

const sortBooksByPostalCode = async (
  books: Awaited<ReturnType<typeof getBooksData>>,
) => {
  const userId = await getConnectedUserId();

  if (!userId) return books;

  const userData = await db.user.findUnique({
    where: { id: userId },
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

export const getConnectedUserBooks = async () => {
  const connectedUserId = await getConnectedUserId();

  if (!connectedUserId) return null;

  const books = await getBooksByUserId(connectedUserId);

  return books.filter(
    (book) => !book.booking && !book.proposed && !book.propositionReceived,
  );
};
