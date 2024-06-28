"use server";

import { getBooksByUserIdLegacy, getConnectedUserId } from "@/actions";
import { BookCard } from "../book-card";
import classes from "./user-books-cards-container.module.css";
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
