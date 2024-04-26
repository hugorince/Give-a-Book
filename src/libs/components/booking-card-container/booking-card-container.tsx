"use server";

import { BooksData, getUserInfo } from "@/libs/utils";
import { BookingCard } from "../booking-card";
import classes from "./booking-card-container.module.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth/auth";

interface BookingCardContainer {
  books: BooksData[];
}

export const BookingCardContainer = async ({ books }: BookingCardContainer) => {
  const user = await getServerSession(authOptions);
  if (!user) return null;
  const connectedUser = await getUserInfo(user?.user.id);
  if (!connectedUser) return null;

  return (
    <div className={classes.container}>
      {books.map((book, index) => (
        <BookingCard key={index} book={book} connectedUser={connectedUser} />
      ))}
    </div>
  );
};
