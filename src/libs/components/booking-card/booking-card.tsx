import type { BookedBook } from "@/libs/utils";
import { RequestBook } from "../request-book";
import { Link } from "@/libs/ui-components";
import { DeleteBook } from "../delete-book";
import classes from "./booking-card.module.css";

interface BookingCard {
  book: BookedBook;
  connectedUser: number;
}

export const BookingCard = ({ book, connectedUser }: BookingCard) => {
  if (!book || !connectedUser) return null;

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
          <p>{book.distance} km from you</p>
        </div>
      </div>
      <div className={classes.actionsContainer}>
        <RequestBook book={book} />
        {connectedUser === book.userId && <DeleteBook book={book} />}
      </div>
    </div>
  );
};
