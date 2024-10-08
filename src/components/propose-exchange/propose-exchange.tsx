"use server";

import type { BookPageData } from "@/types";
import { FaRegCircleCheck } from "react-icons/fa6";
import { ProposeExchangeButton } from "../propose-exchange-button";
import { getConnectedUserBooks } from "@/actions";
import classes from "./propose-exchange.module.css";

interface ProposeExchangeProps {
  book: BookPageData;
}

export const ProposeExchange = async ({ book }: ProposeExchangeProps) => {
  const connectedUserBooks = await getConnectedUserBooks();

  if (!connectedUserBooks) return <div>error</div>;

  return (
    <div className={classes.bookExchangeWrapper}>
      <FaRegCircleCheck size={64} color="green" />
      <p>This book is available to exchange</p>
      <ProposeExchangeButton
        book={book}
        connectedUserBooks={connectedUserBooks}
      />
    </div>
  );
};
