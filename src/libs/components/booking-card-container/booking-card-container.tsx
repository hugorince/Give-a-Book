"use server";

import { type BookedBook, getUserInfo } from "@/libs/utils";
import { BookingCard } from "../booking-card";
import classes from "./booking-card-container.module.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth/auth";

interface BookingCardContainer {
  books: BookedBook[];
}

export const BookingCardContainer = async ({ books }: BookingCardContainer) => {
  const user = await getServerSession(authOptions);
  if (!user || !books) return null;

  return (
    <div className={classes.container}>
      {books.map((book, index) => (
        <BookingCard key={index} book={book} connectedUser={user.user.id} />
      ))}
    </div>
  );
};
