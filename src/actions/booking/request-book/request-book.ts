"use server";

import type { BookPageData } from "@/types";
import type { User } from "@prisma/client";
import { calculateDistance } from "@/utils";
import { db } from "@/db";
import { getConnectedUserId } from "@/actions/user";
import { BOOKING_STATUS, NOTIFICATION_TYPE } from "@/constants";

export const createBooking = async (book: BookPageData, requester: User) => {
  try {
    if (!book.gpsCoordinates) return null;

    const distance = await calculateDistance(
      book.gpsCoordinates,
      requester.gpsCoordinates,
    );

    const newBooking = await db.booking.create({
      data: {
        status: BOOKING_STATUS.REQUESTED,
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
        type: NOTIFICATION_TYPE.BOOKING_REQUEST,
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
        status: BOOKING_STATUS.REQUESTED,
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
