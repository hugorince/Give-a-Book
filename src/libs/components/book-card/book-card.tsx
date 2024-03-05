"use server";

import NextLink from "next/link";
import { Button, Link } from "@/libs/ui-components";
import classes from "./book-card.module.css";
import { BooksData } from "@/libs/utils";
import { Chip } from "@/libs/ui-components";
import { LikeButton } from "..";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth/auth";

export const BookCard = async ({ data }: { data: BooksData }) => {
  const exchangeOrGive = data.exchange ? "Exchange" : "Give";
  const user = await getServerSession(authOptions);
  const userId = user?.user.id;

  if (userId) {
    const isLiked = data.likes.includes(parseInt(userId));
    return (
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <div className={classes.chipLike}>
            <Chip label={exchangeOrGive} exchange={data.exchange} />
            <LikeButton isLiked={isLiked} bookId={data.id} />
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
  }
};
