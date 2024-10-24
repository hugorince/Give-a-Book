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
  const userProfileHref = isConnectedUserBook
    ? "/profile"
    : `/user/${book.userId}`;

  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <div className={classes.chipLike}>
          <div className={classes.chips}>
            <Chip
              label={exchangeOrGive}
              variant={book.exchange ? "info-2" : "info"}
            />
            {isRequested && <Chip label="Requested" variant="error" />}
            {isCompleted && <Chip label="Completed" variant="success" />}
            {isInExchangeProposition && (
              <Chip label="proposed" variant="error" />
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
          <Link href={userProfileHref} variant="unstyled">
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
