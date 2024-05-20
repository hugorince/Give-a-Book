import type { BookPageData } from "@/libs/types";
import { AlreadyRequested } from "./already-requested";
import { NotConnectedRequestBook } from "./not-connected-request-book";
import { BookNewRequest } from "./book-new-request";

interface RequestBookProps {
  book: BookPageData;
  connectedUserId: number | undefined;
}

export const RequestBookContainer = ({
  book,
  connectedUserId,
}: RequestBookProps) => {
  const disableRequest =
    connectedUserId !== book.booking?.ownerId && book.booking?.requesterId;

  if (!connectedUserId) return <NotConnectedRequestBook />;

  return (
    <div>
      {!disableRequest ? <BookNewRequest book={book} /> : <AlreadyRequested />}
    </div>
  );
};
