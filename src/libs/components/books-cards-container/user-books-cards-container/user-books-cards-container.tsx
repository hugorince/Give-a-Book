"use server";

import { getBooksByUserIdLegacy, getConnectedUserId } from "@/libs/server";
import classes from "./user-books-cards-container.module.css";
import { BookCard } from "../../book-card";
interface UserBooksCardsWrapperProps {
  userId: number;
}

export const UserBooksCardsContainer = async ({
  userId,
}: UserBooksCardsWrapperProps) => {
  const connectedUserId = await getConnectedUserId();
  const usersBooks = await getBooksByUserIdLegacy(userId);

  return (
    <div className={classes.booksWrapper}>
      {usersBooks.map((book, index) => (
        <BookCard book={book} key={index} connectedUserId={connectedUserId} />
      ))}
    </div>
  );
};
