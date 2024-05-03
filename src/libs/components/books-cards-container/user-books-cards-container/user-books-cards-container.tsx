"use server";

import { getBookByUserId } from "@/libs/database";
import classes from "./user-books-cards-container.module.css";
import { BookCard } from "../../book-card";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth/auth";

interface UserBooksCardsWrapperProps {
  userId: string;
}

export const UserBooksCardsContainer = async ({
  userId,
}: UserBooksCardsWrapperProps) => {
  const user = await getServerSession(authOptions);
  const connectedUserId = user ? user?.user?.id : undefined;

  const displayBooks = await getBookByUserId(userId);

  return (
    <div className={classes.booksWrapper}>
      {displayBooks.map((book, index) => (
        <BookCard book={book} key={index} connectedUserId={connectedUserId} />
      ))}
    </div>
  );
};
