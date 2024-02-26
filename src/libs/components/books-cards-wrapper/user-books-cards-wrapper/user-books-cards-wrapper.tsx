"use server";

import { getBooksData } from "@/libs/utils";
import classes from "./user-books-cards-wrapper.module.css";
import { BookCard } from "../../book-card";

interface UserBooksCardsWrapperProps {
  userId: string;
}

export const UserBooksCardsWrapper = async ({
  userId,
}: UserBooksCardsWrapperProps) => {
  const displayBooks = await getBooksData();

  return (
    <div className={classes.booksWrapper}>
      {displayBooks.map((book, index) => {
        if (book.userId && book.userId.toString() === userId) {
          return <BookCard data={book} key={index} />;
        }
      })}
    </div>
  );
};
