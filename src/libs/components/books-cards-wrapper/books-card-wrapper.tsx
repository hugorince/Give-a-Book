"use server";

import classes from "./books-cards-wrapper.module.css";
import { getBooksData } from "@/libs/utils";
import { BookCard } from "..";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth/auth";

interface ParamsProps {
  [key: string]: string;
}

export const BooksCardWrapper = async ({
  searchParams,
}: {
  searchParams: ParamsProps;
}) => {
  const displayBooks = await getBooksData();
  const user = await getServerSession(authOptions);
  const userId = user?.user.id || null;

  if (searchParams.filter) {
    const params = searchParams.filter.split(",");
    const singleParam = params && (params[0] as "exchange" | "give");

    return (
      <div>
        {params.length > 1 ? (
          <div className={classes.booksWrapper}>
            {displayBooks.map((book, index) => {
              return <BookCard data={book} key={index} userId={userId} />;
            })}
          </div>
        ) : (
          <div className={classes.booksWrapper}>
            {displayBooks.map((book, index) => {
              if (book[singleParam])
                return <BookCard data={book} key={index} userId={userId} />;
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
          return <BookCard data={book} key={index} userId={userId} />;
        })}
      </div>
    </div>
  );
};
