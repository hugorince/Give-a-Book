"use server";

import type { BookPageData } from "@/types";
import { getUserInfo } from "@/actions";
import { calculateDistance, postedOn } from "@/utils";
import { Chip, Link } from "@/ui-kit";
import { LikeButton } from "../like-button";
import classes from "./book-page-infos.module.css";

interface BookPageInfosProps {
  book: BookPageData;
  connectedUserId?: number;
}

export const BookPageInfos = async ({
  book,
  connectedUserId,
}: BookPageInfosProps) => {
  const requestTypeLabel = book.exchange ? "Exchange" : "Give";
  const postedOnLabel = postedOn(book.createdAt);
  const isLiked =
    connectedUserId && book.likes.includes(connectedUserId) ? true : false;

  const connectedUserInfos =
    connectedUserId && (await getUserInfo(connectedUserId));
  const ownerInfos = await getUserInfo(book.userId);
  const isOwnBook =
    connectedUserInfos && connectedUserInfos?.id === ownerInfos?.id;

  const getDistance = async () => {
    if (!connectedUserId || !connectedUserInfos || !ownerInfos || isOwnBook)
      return null;

    return calculateDistance(
      connectedUserInfos.gpsCoordinates,
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
          {distance !== null && !isOwnBook && (
            <p>{Math.floor(distance)} km from you</p>
          )}
          <p>{postedOnLabel}</p>
          {book.requested && <Chip label="requested" variant="requested" />}
          <Chip label={requestTypeLabel} exchange={book.exchange} />
          {!isOwnBook && (
            <LikeButton
              isLiked={isLiked}
              bookId={book.id}
              likesNumber={book.likes.length}
              isLoggedIn={connectedUserId !== undefined}
            />
          )}
        </div>
        {!isOwnBook && (
          <Link href={`/user/${book.userId}`} variant="unstyled">
            proposed by {book.username}
          </Link>
        )}
        <h1>{book.title}</h1>
        <h2>{book.author}</h2>
        <p>{book.description}</p>
      </div>
    </div>
  );
};
