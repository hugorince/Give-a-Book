"use server";

import { getBookByUserId } from "@/libs/utils";
import classes from "./user-books-cards-container.module.css";
import { BookCard } from "../../book-card";

interface UserBooksCardsWrapperProps {
  userId: string;
}

export const UserBooksCardsContainer = async ({
  userId,
}: UserBooksCardsWrapperProps) => {
  const displayBooks = await getBookByUserId(userId);

  return (
    <div className={classes.booksWrapper}>
      {displayBooks.map((book, index) => (
        <BookCard data={book} key={index} userId={userId} />
      ))}
    </div>
  );
};
