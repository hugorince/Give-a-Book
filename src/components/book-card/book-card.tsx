"use server";

import type { BookData } from "@/types";
import { Link, Chip } from "@/ui-kit";
import { LikeButton } from "../like-button";
import NextLink from "next/link";
import classes from "./book-card.module.css";

interface BookCardProps {
  book: BookData;
  connectedUserId?: number;
}

export const BookCard = ({ book, connectedUserId }: BookCardProps) => {
  const exchangeOrGive = book.exchange ? "Exchange" : "Give";

  const isLiked =
    connectedUserId && book.likes.includes(connectedUserId) ? true : false;
  const isRequested = book.requested;
  const isCompleted = book.completed;
  const isInExchangeProposition = Boolean(
    book.proposed || book.propositionReceived,
  );
  const isConnectedUserBook = book.userId === connectedUserId;

  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <div className={classes.chipLike}>
          <div className={classes.chips}>
            <Chip label={exchangeOrGive} exchange={book.exchange} />
            {isRequested && <Chip label="requested" variant="requested" />}
            {isCompleted && <Chip label="completed" />}
            {isInExchangeProposition && (
              <Chip label="proposed" variant="requested" />
            )}
          </div>
          {!isConnectedUserBook && (
            <LikeButton
              isLiked={isLiked}
              bookId={book.id}
              likesNumber={book.likes.length}
              isLoggedIn={connectedUserId !== undefined}
            />
          )}
        </div>
        <div className={classes.userLink}>
          <p>offered by </p>
          <Link href={`/user/${book.userId}`} variant="unstyled">
            {book.username}
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
