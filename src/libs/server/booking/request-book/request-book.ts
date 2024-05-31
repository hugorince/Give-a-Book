"use server";

import type { BookData } from "@/libs/types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth/auth";
import { calculateDistance } from "@/libs/utils";
import db from "../../db";

export const requestBook = async (book: BookData, message: string) => {
  const user = await getServerSession(authOptions);

  if (!user) return null;

  const requester = await db.user.findUnique({
    where: { id: parseInt(user.user.id) },
  });

  if (!requester) return null;

  try {
    const distance = await calculateDistance(
      book.gpsCoordinates,
      requester.gpsCoordinates,
    );

    const newBooking = await db.booking.create({
      data: {
        status: "requested",
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

    const newMessage = await db.message.create({
      data: {
        text: message,
        senderId: requester.id,
        chatId: newChat.id,
      },
    });

    const notification = await db.notification.create({
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

export const proposeExchange = async (
  requestedBookId: number,
  proposedBookId: number,
) => {
  try {
    await db.proposition.create({
      data: {
        status: "PENDING",
        proposedBookId: proposedBookId,
        receiverBookId: requestedBookId,
      },
    });
  } catch (err) {
    console.error(err);
  }
};
