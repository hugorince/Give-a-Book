"use server";

import { type BookedBook } from "@/libs/types";
import { BookingCard } from "../booking-card";
import classes from "./booking-card-container.module.css";
import { getConnectedUserId } from "@/libs/server";

interface BookingCardContainer {
  books: BookedBook[];
}

export const BookingCardContainer = async ({ books }: BookingCardContainer) => {
  const connectedUserId = await getConnectedUserId();

  if (!connectedUserId || !books) return null;

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
