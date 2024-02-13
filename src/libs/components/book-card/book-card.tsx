import classes from "./book-card.module.css";
import { BooksData } from "@/libs/utils";

export const BookCard = ({ data }: { data: BooksData }) => {
  return (
    <div className={classes.wrapper}>
      <p>{data.title}</p>
      <img src={data.img || ""} alt="" />
      <p>user : {data.user}</p>
    </div>
  );
};
