"use server";

import type { BookPageData, BookedBook } from "@/libs/types";
import { BookingCard } from "../booking-card/booking-card";
import { getConnectedUserId } from "@/libs/server";
import classes from "./booking-card-container.module.css";

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
