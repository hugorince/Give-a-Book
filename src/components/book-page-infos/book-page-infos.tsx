"use server";

import type { BookPageData } from "@/types";
import { calculateDistance, postedOn } from "@/utils";
import { Chip, Link } from "@/ui-kit";
import { LikeButton } from "../like-button";
import classes from "./book-page-infos.module.css";
import { getUserInfo } from "@/actions";

interface BookPageInfosProps {
  book: BookPageData;
  connectedUserId: number | undefined;
}

export const BookPageInfos = async ({
  book,
  connectedUserId,
}: BookPageInfosProps) => {
  const requestTypeLabel = book.exchange ? "Exchange" : "Give";
  const posted = postedOn(book.createdAt);
  const isLiked =
    connectedUserId && book.likes.includes(connectedUserId) ? true : false;

  const getDistance = async () => {
    if (!connectedUserId) return null;

    const connectedInfos = await getUserInfo(connectedUserId);
    const ownerInfos = await getUserInfo(book.userId);

    if (!connectedInfos || !ownerInfos) return null;

    return calculateDistance(
      connectedInfos.gpsCoordinates,
      ownerInfos.gpsCoordinates,
    );
  };

  const distance = await getDistance();

  return (
    <div className={classes.wrapper}>
      <div className={classes.imageContainer}>
        <img src={book.image as string} alt="" />
      </div>
      <div className={classes.bookInfos}>
        <div className={classes.chipDate}>
          {distance !== null && <p>{Math.floor(distance)} km from you</p>}
          <p>{posted}</p>
          {book.requested && <Chip label="requested" variant="requested" />}
          <Chip label={requestTypeLabel} exchange={book.exchange} />
          <LikeButton
            isLiked={isLiked}
            bookId={book.id}
            likesNumber={book.likes.length}
            isLoggedIn={connectedUserId !== undefined}
          />
        </div>
        <Link href={`/user/${book.userId}`} variant="unstyled">
          proposed by {book.username}
        </Link>
        <h1>{book.title}</h1>
        <h2>{book.author}</h2>
        <p>{book.description}</p>
      </div>
    </div>
  );
};
