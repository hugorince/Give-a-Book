"use server";

import type { BookedBook } from "@/types";
import { BookingCard } from "../booking-card";
import classes from "./booking-card-container.module.css";

interface BookingCardContainerProps {
  books: BookedBook[];
  isRequestedBook?: boolean;
}

export const BookingCardContainer = async ({
  books,
  isRequestedBook = false,
}: BookingCardContainerProps) => {
  return (
    <div className={classes.container}>
      {books.map((book, index) => {
        return (
          <BookingCard
            key={index}
            book={book}
            isRequestedBook={isRequestedBook}
          />
        );
      })}
    </div>
  );
};
