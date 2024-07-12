"use server";

import type { BookedBook } from "@/types";
import { BookingCard } from "../booking-card/booking-card";
import { getConnectedUserId, getUserInfo } from "@/actions";
import classes from "./booking-card-container.module.css";

interface BookingCardContainerProps {
  books: BookedBook[];
}

export const BookingCardContainer = async ({
  books,
}: BookingCardContainerProps) => {
  const connectedUserId = await getConnectedUserId();

  if (!connectedUserId || !books) return null;

  return (
    <div className={classes.container}>
      {books.map(async (book, index) => {
        const bookOwnerInfos = await getUserInfo(book.ownerId);
        if (!bookOwnerInfos) return null;
        return (
          <BookingCard
            key={index}
            book={book}
            connectedUserId={connectedUserId}
            ownerInfos={bookOwnerInfos}
          />
        );
      })}
    </div>
  );
};
