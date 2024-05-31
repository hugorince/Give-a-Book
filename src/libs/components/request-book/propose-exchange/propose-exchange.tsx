import type { BookPageData } from "@/libs/types";
import { FaRegCircleCheck } from "react-icons/fa6";
import { ProposeExchangeButton } from "./propose-exchange-button";
import classes from "./propose-exchange.module.css";

interface ProposeExchangeProps {
  book: BookPageData;
}

export const ProposeExchange = ({ book }: ProposeExchangeProps) => {
  return (
    <div className={classes.bookExchangeWrapper}>
      <FaRegCircleCheck size={64} color="green" />
      <p>This book is available to exchange</p>
      <ProposeExchangeButton book={book} />
    </div>
  );
};
