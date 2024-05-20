import { postedOn } from "@/libs/utils";
import type { BookPageData } from "@/libs/types";
import { Chip } from "@/libs/ui-components";
import classes from "./book-page-infos.module.css";
import { LikeButton } from "../like-button";
import { Booking } from "@prisma/client";

interface BookPageInfosProps {
  book: BookPageData;
  connectedUserId: number | undefined;
}

export const BookPageInfos = ({
  book,
  connectedUserId,
}: BookPageInfosProps) => {
  const exchangeOrGive = book.exchange ? "Exchange" : "Give";
  const posted = postedOn(book.createdAt);

  const isLiked =
    connectedUserId && book.likes.includes(connectedUserId) ? true : false;

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
          <LikeButton
            isLiked={isLiked}
            bookId={book.id}
            likesNumber={book.likes.length}
            isLoggedIn={connectedUserId !== undefined}
          />
        </div>
        <h1>{book.title}</h1>
        <h2>{book.author}</h2>
        <p>{book.description}</p>
      </div>
    </div>
  );
};
