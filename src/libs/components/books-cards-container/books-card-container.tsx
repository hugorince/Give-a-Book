"use server";

import classes from "./books-cards-container.module.css";
import { getBooksWithoutConnectedUser } from "@/libs/database";
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
  const connectedUserId = user ? parseInt(user.user.id) : undefined;

  const books = await getBooksWithoutConnectedUser();

  if (!books) return null;

  const filteredBooks = books.filter((book) => {
    if (searchParams.filter === "liked") {
      return connectedUserId && book.likes.includes(connectedUserId);
    }
    if (searchParams.filter === "give") {
      return book.give;
    }
    if (searchParams.filter === "exchange") {
      return book.exchange;
    }
    if (searchParams.filter === "liked,give") {
      return (
        connectedUserId && book.likes.includes(connectedUserId) && book.give
      );
    }
    if (searchParams.filter === "exchange,liked") {
      return (
        connectedUserId && book.likes.includes(connectedUserId) && book.exchange
      );
    }
    if (searchParams.filter === "liked,give,exchange") {
      return connectedUserId && book.likes.includes(connectedUserId);
    }
    return book;
  });

  return (
    <div className={classes.booksWrapper}>
      {filteredBooks.map((book, index) => (
        <BookCard book={book} key={index} connectedUserId={connectedUserId} />
      ))}
    </div>
  );
};
