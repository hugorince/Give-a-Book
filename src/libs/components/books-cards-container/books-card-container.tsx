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

  const filteredBooks = books.filter((book) => {
    if (searchParams.filter === "liked") {
      return userId && book.likes.includes(parseInt(userId));
    }
    if (searchParams.filter === "give") {
      return book.give;
    }
    if (searchParams.filter === "exchange") {
      return book.exchange;
    }
    if (searchParams.filter === "liked,give") {
      return userId && book.likes.includes(parseInt(userId)) && book.give;
    }
    if (searchParams.filter === "liked,exchange") {
      return userId && book.likes.includes(parseInt(userId)) && book.exchange;
    }
    if (searchParams.filter === "give,exchange") {
      return book.give && book.exchange;
    }
    if (searchParams.filter === "liked,give,exchange") {
      return (
        userId &&
        book.likes.includes(parseInt(userId)) &&
        book.give &&
        book.exchange
      );
    }
    return true;
  });

  return (
    <div className={classes.booksWrapper}>
      {filteredBooks.map((book, index) => (
        <BookCard book={book} key={index} connectedUserId={userId} />
      ))}
    </div>
  );
};
