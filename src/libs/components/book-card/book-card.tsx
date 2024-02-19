import Link from "next/link";
import classes from "./book-card.module.css";
import { BooksData } from "@/libs/utils";

export const BookCard = ({ data }: { data: BooksData }) => {
  return (
    <div className={classes.wrapper}>
      <h3>{data.title}</h3>
      <img src={data.img || ""} alt="" />
      <div className={classes.userLink}>
        <p>offered by </p>
        <Link href={`/user/${data.userId}`}>{data.user}</Link>
      </div>
    </div>
  );
};
