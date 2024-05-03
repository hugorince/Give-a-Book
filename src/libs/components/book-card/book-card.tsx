import { Link, Chip } from "@/libs/ui-components";
import classes from "./book-card.module.css";
import type { BookData } from "@/libs/types";
import { LikeButton } from "..";
import NextLink from "next/link";

export const BookCard = ({
  book,
  connectedUserId,
}: {
  book: BookData;
  connectedUserId?: string;
}) => {
  const exchangeOrGive = book.exchange ? "Exchange" : "Give";

  const isLiked = book.likes.includes(parseInt(connectedUserId || ""));
  const requested = book.requested;

  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <div className={classes.chipLike}>
          <Chip label={exchangeOrGive} exchange={book.exchange} />
          {requested && <Chip label="requested" variant="requested" />}
          {connectedUserId && parseInt(connectedUserId) !== book.userId && (
            <>
              {connectedUserId ? (
                <LikeButton isLiked={isLiked} bookId={book.id} isLoggedIn />
              ) : (
                <LikeButton
                  isLiked={false}
                  bookId={book.id}
                  isLoggedIn={false}
                />
              )}
            </>
          )}
        </div>
        <div className={classes.userLink}>
          <p>offered by </p>
          <Link href={`/user/${book.userId}`} variant="unstyled">
            {book.user}
          </Link>
        </div>
      </div>
      <NextLink href={`/book/${book.id}`} aria-hidden tabIndex={-1}>
        <img src={book.image || ""} alt="" />
      </NextLink>
      <Link variant="unstyled" href={`/book/${book.id}`}>
        <h3>{book.title}</h3>
      </Link>
    </div>
  );
};
