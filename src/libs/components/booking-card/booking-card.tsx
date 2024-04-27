"use server";

import type { BooksData } from "@/libs/utils";
import type { User } from "@prisma/client";
import { RequestBook } from "../request-book";
import { Link } from "@/libs/ui-components";
import { DeleteBook } from "../delete-book";
import { BookingCardDistance } from "./booking-card-distance";
import classes from "./booking-card.module.css";

interface BookingCard {
  book: BooksData;
  connectedUser: User;
}

export const BookingCard = ({ book, connectedUser }: BookingCard) => {
  if (!book || !connectedUser) return null;

  const isRequested = connectedUser.id !== book.userId;

  return (
    <div className={classes.cardWrapper}>
      <div className={classes.imageTitle}>
        <img src={book.image as string} alt="" />
        <div className={classes.bookInfos}>
          <Link href={`user/${book.userId}`} variant="unstyled" size="l">
            {book.title}
          </Link>
          <div className={classes.ownerLink}>
            <p>proposed by </p>
            <Link href={`user/${book.userId}`} variant="unstyled">
              {book.user}
            </Link>
          </div>

          {isRequested && (
            <BookingCardDistance
              ownerPostalCode={book.postalCode}
              requesterPostalCode={connectedUser.postalCode}
            />
          )}
        </div>
      </div>
      <div className={classes.actionsContainer}>
        <RequestBook book={book} />
        {connectedUser.id === book.userId && <DeleteBook book={book} />}
      </div>
    </div>
  );
};
