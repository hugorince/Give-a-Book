import { RxQuestionMarkCircled } from "react-icons/rx";
import classes from "./book-cancel-proposition.module.css";
import { RefusePropositionButton } from "../refuse-proposition-button";
import { BookPageData } from "@/types";
import { DeleteBook } from "../delete-book";

export const BookCancelProposition = ({
  book,
  withDeleteButton,
}: {
  book: BookPageData;
  withDeleteButton?: boolean;
}) => {
  const propositionId =
    (book.proposed && book.proposed?.id) ||
    (book.propositionReceived && book.propositionReceived?.id);

  return (
    <div className={classes.bookCancelPropositionWrapper}>
      <RxQuestionMarkCircled size={64} color="orange" />
      <p>You can cancel this request if you want</p>
      {propositionId && (
        <div className={classes.actionsContainer}>
          <RefusePropositionButton
            propositionId={propositionId}
            label="Cancel Proposition"
          />
          {withDeleteButton && <DeleteBook bookId={book.id} />}
        </div>
      )}
    </div>
  );
};
