"use server";

import { BooksData } from "@/libs/utils";
import { BookingCard } from "../booking-card";
import classes from "./booking-card-container.module.css";

interface BookingCardContainer {
  books: BooksData[];
}

export const BookingCardContainer = async ({ books }: BookingCardContainer) => {
  return (
    <div className={classes.container}>
      {books.map((book, index) => (
        <BookingCard key={index} book={book} />
      ))}
    </div>
  );
};
