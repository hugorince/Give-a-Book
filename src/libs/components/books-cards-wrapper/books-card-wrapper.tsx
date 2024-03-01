"use server";

import classes from "./books-cards-wrapper.module.css";
import { getBooksData } from "@/libs/utils";
import { BookCard } from "..";

interface ParamsProps {
  [key: string]: string;
}

export const BooksCardWrapper = async ({
  searchParams,
}: {
  searchParams: ParamsProps;
}) => {
  const displayBooks = await getBooksData();

  if (searchParams.filter) {
    const params = searchParams.filter.split(",");
    const singleParam = params && (params[0] as "exchange" | "give");

    return (
      <div>
        {params.length > 1 ? (
          <div className={classes.booksWrapper}>
            {displayBooks.map((book, index) => {
              return <BookCard data={book} key={index} />;
            })}
          </div>
        ) : (
          <div className={classes.booksWrapper}>
            {displayBooks.map((book, index) => {
              if (book[singleParam])
                return <BookCard data={book} key={index} />;
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className={classes.booksWrapper}>
        {displayBooks.map((book, index) => {
          return <BookCard data={book} key={index} />;
        })}
      </div>
    </div>
  );
};
