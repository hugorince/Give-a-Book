"use server";

import classes from "./books-cards-wrapper.module.css";
import { getBooksData } from "@/libs/utils";
import { BookCard, FilterBooks } from "..";

interface ParamsProps {
  [key: string]: string;
}

export const BooksCardWrapper = async ({ searchParams }: ParamsProps) => {
  console.log(searchParams);
  const displayBooks = await getBooksData();

  return (
    <>
      <FilterBooks />
      {searchParams["filter"] === "exchange,give" ? (
        <div className={classes.booksWrapper}>
          {displayBooks.map((book, index) => {
            return <BookCard data={book} key={index} />;
          })}
        </div>
      ) : searchParams["filter"] === "exchange" ? (
        <div className={classes.booksWrapper}>
          {displayBooks.map((book, index) => {
            if (book.exchange) return <BookCard data={book} key={index} />;
          })}
        </div>
      ) : searchParams["filter"] === "give" ? (
        <div className={classes.booksWrapper}>
          {displayBooks.map((book, index) => {
            if (book.give) return <BookCard data={book} key={index} />;
          })}
        </div>
      ) : (
        <div className={classes.booksWrapper}>
          {displayBooks.map((book, index) => {
            return <BookCard data={book} key={index} />;
          })}
        </div>
      )}
    </>
  );
};
