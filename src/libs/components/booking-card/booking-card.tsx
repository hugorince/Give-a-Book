"use server";

import { BooksData } from "@/libs/utils";
import classes from "./booking-card.module.css";
import { RequestBook } from "../request-book";
import { Link } from "@/libs/ui-components";
import { DeleteBook } from "../delete-book";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth/auth";

interface BookingCard {
  book: BooksData;
}

export const BookingCard = async ({ book }: BookingCard) => {
  const user = await getServerSession(authOptions);

  if (!book || !user) return null;
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
          <p>available near {book.postalCode}</p>
        </div>
      </div>
      <div className={classes.actionsContainer}>
        <RequestBook book={book} />
        {parseInt(user.user.id) === book.userId && <DeleteBook book={book} />}
      </div>
    </div>
  );
};
