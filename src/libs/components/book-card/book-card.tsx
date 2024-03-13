import { Link } from "@/libs/ui-components";
import classes from "./book-card.module.css";
import { BooksData } from "@/libs/utils";
import { Chip } from "@/libs/ui-components";
import { LikeButton } from "..";

export const BookCard = ({
  data,
  userId,
}: {
  data: BooksData;
  userId?: string;
}) => {
  const exchangeOrGive = data.exchange ? "Exchange" : "Give";
  const isLiked = data.likes.includes(parseInt(userId || ""));

  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <div className={classes.chipLike}>
          <Chip label={exchangeOrGive} exchange={data.exchange} />
          {userId ? (
            <LikeButton isLiked={isLiked} bookId={data.id} isLoggedIn />
          ) : (
            <LikeButton isLiked={false} bookId={data.id} isLoggedIn={false} />
          )}
        </div>
        <div className={classes.userLink}>
          <p>offered by </p>
          <Link href={`/user/${data.userId}`} variant="unstyled">
            {data.user}
          </Link>
        </div>
      </div>
      <img src={data.image || ""} alt="" />
      <Link variant="unstyled" href={`/book/${data.id}`}>
        <h3>{data.title}</h3>
      </Link>
    </div>
  );
};
