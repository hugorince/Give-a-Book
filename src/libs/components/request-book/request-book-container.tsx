"use server";

import type { BookPageData } from "@/libs/types";
import { BookAlreadyRequested } from "./book-already-requested";
import { NotConnectedRequestBook } from "./not-connected-request-book";
import { BookNewRequest } from "./book-new-request";
import { BookCancelRequest } from "./book-cancel-request";

interface RequestBookProps {
  book: BookPageData;
  connectedUserId: number | undefined;
}

export const RequestBookContainer = ({
  book,
  connectedUserId,
}: RequestBookProps) => {
  const isAlreadyRequestedByOrFromConnectedUser =
    connectedUserId === book.booking?.ownerId ||
    connectedUserId === book.booking?.requesterId;
  const isAlreadyRequested = book.requested;

  if (!connectedUserId) return <NotConnectedRequestBook />;

  if (isAlreadyRequestedByOrFromConnectedUser)
    return <BookCancelRequest book={book} />;

  if (isAlreadyRequested) return <BookAlreadyRequested />;

  return <BookNewRequest book={book} />;
};
