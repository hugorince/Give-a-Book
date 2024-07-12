"use server";

import type { BookedBook } from "@/types";
import { getConnectedUserId } from "@/actions";
import { BookingCard } from "../booking-card";
import classes from "./booking-card-container.module.css";

interface BookingCardContainerProps {
  books: BookedBook[];
}

export const BookingCardContainer = async ({
  books,
}: BookingCardContainerProps) => {
  console.log(books);
  const connectedUserId = await getConnectedUserId();

  if (!connectedUserId) return null;

  return (
    <div className={classes.container}>
      {books.map((book, index) => {
        return (
          <BookingCard
            key={index}
            book={book}
            connectedUserId={connectedUserId}
          />
        );
      })}
    </div>
  );
};
