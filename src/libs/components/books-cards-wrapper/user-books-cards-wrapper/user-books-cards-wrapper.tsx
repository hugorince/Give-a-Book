"use server";

import { getBooksData } from "@/libs/utils";
import classes from "./user-books-cards-wrapper.module.css";
import { BookCard } from "../../book-card";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth/auth";

interface UserBooksCardsWrapperProps {
  userId: string;
}

export const UserBooksCardsWrapper = async ({
  userId,
}: UserBooksCardsWrapperProps) => {
  const displayBooks = await getBooksData();
  const user = await getServerSession(authOptions);
  const connectedUserId = user?.user.id;

  if (connectedUserId) {
    return (
      <div className={classes.booksWrapper}>
        {displayBooks.map((book, index) => {
          if (book.userId && book.userId.toString() === userId) {
            return (
              <BookCard data={book} key={index} userId={connectedUserId} />
            );
          }
        })}
      </div>
    );
  }

  return (
    <div className={classes.booksWrapper}>
      {displayBooks.map((book, index) => {
        if (book.userId && book.userId.toString() === userId) {
          return <BookCard data={book} key={index} userId={null} />;
        }
      })}
    </div>
  );
};
