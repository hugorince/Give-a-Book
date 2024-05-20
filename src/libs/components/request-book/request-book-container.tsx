import type { BookPageData } from "@/libs/types";
import { AlreadyRequested } from "./already-requested";
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
  const isAlreadyRequested = book.requested;
  const isAlreadyRequestedByOrFromConnectedUser =
    connectedUserId === book.booking?.ownerId ||
    connectedUserId === book.booking?.requesterId;

  if (!connectedUserId) return <NotConnectedRequestBook />;

  if (isAlreadyRequestedByOrFromConnectedUser)
    return <BookCancelRequest book={book} />;

  if (isAlreadyRequested) return <AlreadyRequested />;

  return <BookNewRequest book={book} />;
};
