"use server";

import classes from "./books-cards-wrapper.module.css";
import { getBooksData } from "@/libs/utils";
import { BookCard } from "..";

export const BooksCardWrapper = async () => {
  const displayBooks = await getBooksData();

  return (
    <div className={classes.booksWrapper}>
      {displayBooks.map((book, index) => {
        return <BookCard data={book} key={index} />;
      })}
    </div>
  );
};
