"use server";

import classes from "./books-cards-container.module.css";
import { getBooksWithoutConnectedUser } from "@/libs/utils";
import { BookCard } from "..";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth/auth";

interface ParamsProps {
  [key: string]: string;
}

export const BooksCardContainer = async ({
  searchParams,
}: {
  searchParams: ParamsProps;
}) => {
  const user = await getServerSession(authOptions);
  const userId = user?.user?.id || "";
  const books = await getBooksWithoutConnectedUser();

  if (!books) return null;

  if (!searchParams.filter) {
    console.log("entered no filters");
    return (
      <div className={classes.booksWrapper}>
        {books.map((book, index) => {
          return <BookCard book={book} key={index} connectedUserId={userId} />;
        })}
      </div>
    );
  }

  const params = searchParams.filter.split(",");
  const give = (params.includes("give") && "give") || null;
  const exchange = (params.includes("exchange") && "exchange") || null;
  const likedOnly = (params.includes("liked") && "liked") || null;

  return (
    <>
      {exchange && give && !likedOnly ? (
        <div className={classes.booksWrapper}>
          {books.map((book, index) => {
            return (
              <BookCard book={book} key={index} connectedUserId={userId} />
            );
          })}
        </div>
      ) : exchange && !give && !likedOnly ? (
        <div className={classes.booksWrapper}>
          {books.map((book, index) => {
            if (book[exchange])
              return (
                <BookCard book={book} key={index} connectedUserId={userId} />
              );
          })}
        </div>
      ) : give && !exchange && !likedOnly ? (
        <div className={classes.booksWrapper}>
          {books.map((book, index) => {
            if (book[give])
              return (
                <BookCard book={book} key={index} connectedUserId={userId} />
              );
          })}
        </div>
      ) : likedOnly && !exchange && !give ? (
        <div className={classes.booksWrapper}>
          {books.map((book, index) => {
            if (userId && book.likes.includes(parseInt(userId)))
              return (
                <BookCard book={book} key={index} connectedUserId={userId} />
              );
          })}
        </div>
      ) : likedOnly && exchange && !give ? (
        <div className={classes.booksWrapper}>
          {books.map((book, index) => {
            if (
              userId &&
              book.likes.includes(parseInt(userId)) &&
              book[exchange]
            )
              return (
                <BookCard book={book} key={index} connectedUserId={userId} />
              );
          })}
        </div>
      ) : likedOnly && give && !exchange ? (
        <div className={classes.booksWrapper}>
          {books.map((book, index) => {
            if (userId && book.likes.includes(parseInt(userId)) && book[give])
              return (
                <BookCard book={book} key={index} connectedUserId={userId} />
              );
          })}
        </div>
      ) : (
        likedOnly &&
        give &&
        exchange && (
          <div className={classes.booksWrapper}>
            {books.map((book, index) => {
              if (userId && book.likes.includes(parseInt(userId)))
                return (
                  <BookCard book={book} key={index} connectedUserId={userId} />
                );
            })}
          </div>
        )
      )}
    </>
  );
};
