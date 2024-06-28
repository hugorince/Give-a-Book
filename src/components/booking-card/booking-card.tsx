"use server";

import type { BookedBook } from "@/types";
import { Link } from "@/ui-kit";
import { DeleteBook } from "../delete-book";
import { RequestBookButton } from "../request-book-button";
import classes from "./booking-card.module.css";

interface BookingCardProps {
  book: BookedBook;
  connectedUserId: number;
}

export const BookingCard = ({ book, connectedUserId }: BookingCardProps) => {
  if (!book || !connectedUserId) return null;

  const isConnectedUserBook = connectedUserId === book.userId;

  return (
    <div className={classes.cardWrapper}>
      <div className={classes.imageTitle}>
        <img src={book.image as string} alt="" />
        <div className={classes.bookInfos}>
          <Link href={`/book/${book.id}`} variant="unstyled" size="l">
            {book.title}
          </Link>
          <div className={classes.ownerLink}>
            <p>proposed by </p>
            <Link href={`/user/${book.userId}`} variant="unstyled">
              {book.user}
            </Link>
          </div>
          <p>{book.distance} km from you</p>
        </div>
      </div>
      <div className={classes.actionsContainer}>
        <Link href={`/chat/${book.bookingId}`}>Message</Link>
        <RequestBookButton book={book} />
        {isConnectedUserBook && <DeleteBook bookId={book.id} />}
      </div>
    </div>
  );
};
