import { BooksData } from "@/libs/utils";
import classes from "./booking-card.module.css";
import Image from "next/image";
import { RequestBook } from "../request-book";

interface BookingCard {
  book: BooksData;
}

export const BookingCard = ({ book }: BookingCard) => {
  if (!book) return null;
  return (
    <div className={classes.cardWrapper}>
      <div>
        <h3>{book.title}</h3>
        <img src={book.image as string} alt="" />
      </div>
      <RequestBook book={book} />
    </div>
  );
};
