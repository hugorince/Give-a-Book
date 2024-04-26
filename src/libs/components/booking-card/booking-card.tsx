"use server";

import { type BooksData, calculateDistance, getUserInfo } from "@/libs/utils";
import classes from "./booking-card.module.css";
import { RequestBook } from "../request-book";
import { Link } from "@/libs/ui-components";
import { DeleteBook } from "../delete-book";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth/auth";
import type { User } from "@prisma/client";

interface BookingCard {
  book: BooksData;
  connectedUser: User;
}

export const BookingCard = async ({ book, connectedUser }: BookingCard) => {
  if (!book || !connectedUser) return null;

  const distance =
    connectedUser.id !== book.userId &&
    (await calculateDistance(book.postalCode, connectedUser.postalCode));

  return (
    <div className={classes.cardWrapper}>
      <div className={classes.imageTitle}>
        <img src={book.image as string} alt="" />
        <div className={classes.bookInfos}>
          <Link href={`user/${book.userId}`} variant="unstyled" size="l">
            {book.title}
          </Link>
          <Link href={`user/${book.userId}`} variant="unstyled">
            proposed by {book.user}
          </Link>
          {distance && <p>{distance} km from you</p>}
        </div>
      </div>
      <div className={classes.actionsContainer}>
        <RequestBook book={book} />
        {connectedUser.id === book.userId && <DeleteBook book={book} />}
      </div>
    </div>
  );
};
