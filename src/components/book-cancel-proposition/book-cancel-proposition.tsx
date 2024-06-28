import { RxQuestionMarkCircled } from "react-icons/rx";
import classes from "./book-cancel-proposition.module.css";
import { RefusePropositionButton } from "../refuse-proposition-button";
import { BookPageData } from "@/types";

export const BookCancelProposition = ({ book }: { book: BookPageData }) => {
  const propositionId =
    (book.proposed && book.proposed?.id) ||
    (book.propositionReceived && book.propositionReceived?.id);

  return (
    <div className={classes.bookCancelPropositionWrapper}>
      <RxQuestionMarkCircled size={64} color="orange" />
      <p>You can cancel this request if you want</p>
      <div>
        {propositionId && (
          <RefusePropositionButton propositionId={propositionId} />
        )}
      </div>
    </div>
  );
};
