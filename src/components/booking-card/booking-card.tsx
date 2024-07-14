"use server";

import type { BookedBook } from "@/types";
import { Link } from "@/ui-kit";
import classes from "./booking-card.module.css";
import { CancelRequestBookButton } from "../cancel-book-request-button";
import { CompleteBookingButton } from "../complete-booking-button";

interface BookingCardProps {
  book: BookedBook;
  connectedUserId: number;
}

export const BookingCard = ({ book }: BookingCardProps) => {
  return (
    <div className={classes.cardWrapper}>
      <div className={classes.imageTitle}>
        <img src={book.image as string} alt="" />
        <div className={classes.bookInfos}>
          <Link
            href={`/book/${book.id}`}
            variant="unstyled"
            size="l"
            className={classes.title}
          >
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
        <CompleteBookingButton bookingId={book.bookingId} />
      </div>
    </div>
  );
};
