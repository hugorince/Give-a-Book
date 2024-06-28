import type { PropositionProposed, RequestedExchangeBook } from "@/types";
import classes from "./proposition-book.module.css";
import { Link } from "@/ui-kit";

interface PropositionBookProps {
  book: PropositionProposed | RequestedExchangeBook;
}

export const PropositionBook = ({ book }: PropositionBookProps) => {
  return (
    <div className={classes.bookContainer}>
      <Link variant="unstyled" href={`book/${book.id}`}>
        {book.title}
      </Link>
      {book.image && <img src={book.image} alt="" />}
    </div>
  );
};
