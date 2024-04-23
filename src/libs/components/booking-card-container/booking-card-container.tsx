"use server";

import { getUserRequestedBook } from "@/libs/utils";
import { BookingCard } from "../booking-card";

export const BookingCardContainer = async () => {
  const requestedBooks = await getUserRequestedBook();

  if (!requestedBooks) return null;

  return (
    <>
      {requestedBooks.map((book, index) => (
        <BookingCard key={index} book={book} />
      ))}
    </>
  );
};
