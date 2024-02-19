"use server";

import classes from "./books-cards-wrapper.module.css";
import { getBooksData } from "@/libs/utils";
import { BookCard } from "..";

interface BooksCardWrapperProps {
  userId?: string;
}

export const BooksCardWrapper = async ({ userId }: BooksCardWrapperProps) => {
  const displayBooks = await getBooksData();
  if (!userId) {
    return (
      <div className={classes.booksWrapper}>
        {displayBooks.map((book, index) => {
          return <BookCard data={book} key={index} />;
        })}
      </div>
    );
  }

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
