import type { BookedBook } from "@/libs/types";
import { Link } from "@/libs/ui-components";
import { DeleteBook } from "../delete-book";
import classes from "./booking-card.module.css";
import { RequestBookButton } from "../request-book/request-book-button";

interface BookingCard {
  book: BookedBook;
  connectedUserId: number;
}

export const BookingCard = ({ book, connectedUserId }: BookingCard) => {
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
        {isConnectedUserBook && <DeleteBook book={book} />}
      </div>
    </div>
  );
};
