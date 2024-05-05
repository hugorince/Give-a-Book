import { postedOn } from "@/libs/utils";
import type { BookData } from "@/libs/types";
import { Chip } from "@/libs/ui-components";
import classes from "./book-page-infos.module.css";

interface BookPageInfosProps {
  book: BookData;
}

export const BookPageInfos = ({ book }: BookPageInfosProps) => {
  const exchangeOrGive = book.exchange ? "Exchange" : "Give";
  const posted = postedOn(book.createdAt);

  return (
    <div className={classes.wrapper}>
      <div className={classes.imageContainer}>
        <img src={book.image as string} alt="" />
      </div>
      <div className={classes.bookInfos}>
        <div className={classes.chipDate}>
          <p>{posted}</p>
          {book.requested && <Chip label="requested" variant="requested" />}
          <Chip label={exchangeOrGive} exchange={book.exchange} />
        </div>
        <h1>{book.title}</h1>
        <h2>{book.author}</h2>
        <p>{book.description}</p>
      </div>
    </div>
  );
};
