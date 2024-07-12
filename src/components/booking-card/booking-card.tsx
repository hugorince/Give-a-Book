"use server";

import type { BookedBook } from "@/types";
import { Link } from "@/ui-kit";
import { DeleteBook } from "../delete-book";
import classes from "./booking-card.module.css";
import { CancelRequestBookButton } from "../cancel-book-request-button";

interface BookingCardProps {
  book: BookedBook;
  connectedUserId: number;
}

export const BookingCard = ({ book, connectedUserId }: BookingCardProps) => {
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
              {book.username}
            </Link>
          </div>
          <p>{book.distance} km from you</p>
        </div>
      </div>
      <div className={classes.actionsContainer}>
        <Link href={`/chat/${book.bookingId}`}>Message</Link>
        <CancelRequestBookButton book={book} />
        {isConnectedUserBook && <DeleteBook bookId={book.id} />}
      </div>
    </div>
  );
};
