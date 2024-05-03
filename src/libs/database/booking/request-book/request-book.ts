"use server";

import { authOptions } from "@/libs/auth/auth";
import { calculateDistance } from "@/libs/utils";
import type { BookData } from "@/libs/types";
import { getServerSession } from "next-auth";
import db from "../../db";
import { redirect } from "next/navigation";

export const requestBook = async (book: BookData, message: string) => {
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
        chatId: newChat.id,
        distance: distance,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const cancelRequest = async (book: BookData) => {
  const user = await getServerSession(authOptions);

  if (!user) return null;

  try {
    const booking = await db.booking.findFirst({
      where: { bookId: book.id },
    });

    await db.booking.delete({
      where: { id: booking?.id },
    });

    redirect("/books");
  } catch (err) {
    console.error(err);
  }
};
