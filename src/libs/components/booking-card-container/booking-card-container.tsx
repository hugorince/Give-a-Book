"use server";

import { type BookedBook } from "@/libs/types";
import { BookingCard } from "../booking-card";
import classes from "./booking-card-container.module.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth/auth";

interface BookingCardContainer {
  books: BookedBook[];
}

export const BookingCardContainer = async ({ books }: BookingCardContainer) => {
  const user = await getServerSession(authOptions);
  if (!user || !books) return null;

  const connectedUserId = parseInt(user.user.id);

  return (
    <div className={classes.container}>
      {books.map((book, index) => (
        <BookingCard
          key={index}
          book={book}
          connectedUserId={connectedUserId}
        />
      ))}
    </div>
  );
};
