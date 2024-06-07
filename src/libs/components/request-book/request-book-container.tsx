"use server";

import type { BookPageData } from "@/libs/types";
import { BookAlreadyRequested } from "./book-already-requested";
import { NotConnectedRequestBook } from "./not-connected-request-book";
import { BookNewRequest } from "./book-new-request";
import { BookCancelRequest } from "./book-cancel-request";
import { ProposeExchange } from "./propose-exchange";
import { RxQuestionMarkCircled } from "react-icons/rx";
import { DeleteBook } from "../delete-book";
import { BookCancelProposition } from "./book-cancel-proposition";
import classes from "./request-book-container.module.css";

interface RequestBookProps {
  book: BookPageData;
  connectedUserId: number | undefined;
}

export const RequestBookContainer = ({
  book,
  connectedUserId,
}: RequestBookProps) => {
  const isOwnBook = book.userId === connectedUserId;
  const isAlreadyRequested = book.requested;
  const isAlreadyRequestedByOrFromConnectedUser =
    connectedUserId === book.booking?.ownerId ||
    connectedUserId === book.booking?.requesterId;

  const isAlreadyProposed = book.proposed || book.propositionReceived;
  const isAlreadyProposedByConnectedUser = Boolean(
    isAlreadyProposed && isOwnBook,
  );
  const isAlreadyRequestedForExchangeByConnectedUser =
    Boolean(
      isAlreadyProposed && isAlreadyProposed.proposedBookId === book.id,
    ) || isAlreadyProposed?.receiverBookId === book.id;

  console.log("book", book, "isAlreadyProposed", isAlreadyProposed);

  if (isOwnBook && !isAlreadyProposed && !isAlreadyRequested)
    return (
      <div className={classes.ownBookWrapper}>
        <RxQuestionMarkCircled size={64} color="orange" />
        <p>This book is proposed by you, you can cancel this proposition</p>
        <DeleteBook bookId={book.id} />
      </div>
    );

  if (!connectedUserId) return <NotConnectedRequestBook />;

  if (
    isAlreadyProposedByConnectedUser ||
    isAlreadyRequestedForExchangeByConnectedUser
  )
    return <BookCancelProposition book={book} />;

  if (isAlreadyRequestedByOrFromConnectedUser)
    return <BookCancelRequest book={book} />;

  if (isAlreadyRequested || isAlreadyProposed) return <BookAlreadyRequested />;

  if (book.exchange) return <ProposeExchange book={book} />;

  return <BookNewRequest book={book} />;
};
