"use server";

import type { BookPageData } from "@/types";
import type { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/actions/auth/auth";
import { calculateDistance } from "@/utils";
import { db } from "@/db";
import { getConnectedUserId } from "@/actions/user";

export const createBooking = async (book: BookPageData, requester: User) => {
  try {
    if (!book.gpsCoordinates) return null;

    const distance = await calculateDistance(
      book.gpsCoordinates,
      requester.gpsCoordinates,
    );

    const newBooking = await db.booking.create({
      data: {
        status: "REQUESTED",
        type: "REQUEST",
        requesterId: requester.id,
        ownerId: book.userId,
        bookId: book.id,
        distance: distance,
      },
    });

    await db.chat.create({
      data: {
        requesterId: requester.id,
        ownerId: book.userId,
        bookingId: newBooking.id,
      },
    });

    await db.notification.create({
      data: {
        userId: book.userId,
        type: "BOOKING_REQUEST",
        isRead: false,
        bookingId: newBooking.id,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const requestBook = async (book: BookPageData, message: string) => {
  const userId = await getConnectedUserId();

  if (!userId) return null;

  const requester = await db.user.findUnique({
    where: { id: userId },
  });

  if (!requester) return null;

  try {
    if (!book.gpsCoordinates) return null;

    const distance = await calculateDistance(
      book.gpsCoordinates,
      requester.gpsCoordinates,
    );

    const newBooking = await db.booking.create({
      data: {
        status: "REQUESTED",
        type: "REQUEST",
        requesterId: requester.id,
        ownerId: book.userId,
        bookId: book.id,
        distance: distance,
      },
    });

    const newChat = await db.chat.create({
      data: {
        requesterId: requester.id,
        ownerId: book.userId,
        bookingId: newBooking.id,
      },
    });

    await db.message.create({
      data: {
        text: message,
        senderId: requester.id,
        chatId: newChat.id,
      },
    });

    await db.notification.create({
      data: {
        userId: book.userId,
        type: "BOOKING_REQUEST",
        isRead: false,
        bookingId: newBooking.id,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const cancelRequest = async (bookId: number) => {
  const user = await getServerSession(authOptions);

  if (!user) return null;

  try {
    const booking = await db.booking.findFirst({
      where: { bookId: bookId },
    });

    if (!booking) return null;

    await db.booking.delete({
      where: { id: booking.id },
    });
  } catch (err) {
    console.error(err);
  }
};
