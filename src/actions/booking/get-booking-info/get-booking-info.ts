"use server";

import { getConnectedUserId, getUserInfo } from "@/actions/user";
import { BOOKTYPE } from "@/constants";
import { db } from "@/db";
import { Prisma } from "@prisma/client";

type BookingWithBook = Prisma.BookingGetPayload<{
  include: {
    book: true;
    owner: true;
  };
}>;

export const getBookingInfos = async (bookingId: number) => {
  const connectedUserId = await getConnectedUserId();

  const booking = await db.booking.findUnique({
    where: { id: bookingId },
    include: { chat: true, book: true },
  });

  if (!booking?.chat) return null;

  const chat = await db.chat.findUnique({
    where: { id: booking.chat.id },
    include: {
      messages: true,
    },
  });

  const userChat =
    booking.ownerId === connectedUserId ? booking.requesterId : booking.ownerId;

  const userChatUserName = await getUserInfo(userChat);

  return {
    ...booking,
    messages: chat?.messages,
    userChat: {
      id: userChatUserName?.id,
      username: userChatUserName?.username,
    },
  };
};

const getUserBookedBooks = async (bookings: BookingWithBook[]) => {
  const userId = await getConnectedUserId();

  if (!userId) return null;

  const userBookings = bookings.filter((booking) => booking.ownerId === userId);

  const userBookedBooks = userBookings.map((booking) => {
    const book = booking.book;

    if (!book) return null;

    return {
      ...book,
      exchange: book.type === BOOKTYPE.EXCHANGE,
      give: book.type === BOOKTYPE.GIVE,
      requested: true,
      distance: booking.distance,
      bookingId: booking.id,
      ownerId: booking.book.userId,
      username: booking.owner.username || "",
    };
  });

  const filteredUserBookings = userBookedBooks.filter(
    (book): book is NonNullable<typeof book> => book !== undefined,
  );

  return filteredUserBookings;
};

export const getUserBookings = async () => {
  const requesterId = await getConnectedUserId();

  if (!requesterId) return null;

  const bookings = await db.booking.findMany({
    where: { status: "REQUESTED" },
    include: { book: true, owner: true },
  });

  const userBookings = bookings.filter(
    (booking) => booking.requesterId === requesterId,
  );

  const userRequestedBooks = userBookings.map((booking) => {
    const book = booking.book;

    if (!book) return null;

    return {
      ...book,
      exchange: book.type === BOOKTYPE.EXCHANGE,
      give: book.type === BOOKTYPE.GIVE,
      requested: true,
      distance: booking.distance,
      bookingId: booking.id,
      ownerId: booking.book.userId,
      username: booking.owner.username || "",
    };
  });

  const filteredUserRequestedBooks = userRequestedBooks.filter(
    (book): book is NonNullable<typeof book> => book !== undefined,
  );

  const filteredUserBookings = await getUserBookedBooks(bookings);

  return {
    userRequestedBooks: filteredUserRequestedBooks,
    userBookings: filteredUserBookings,
  };
};
