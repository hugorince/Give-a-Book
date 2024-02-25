import Link from "next/link";
import classes from "./book-card.module.css";
import { BooksData } from "@/libs/utils";
import { Chip } from "@/libs/ui-components";

export const BookCard = ({ data }: { data: BooksData }) => {
  const exchangeOrGive = data.exchange ? "Exchange" : "Give";

  return (
    <div className={classes.wrapper}>
      <div className={classes.chip}>
        <Chip label={exchangeOrGive} exchange={data.exchange} />
      </div>
      <h3>
        <Link href={`/book/${data.id}`}>{data.title}</Link>
      </h3>
      <img src={data.image || ""} alt="" />
      <div className={classes.userLink}>
        <p>offered by </p>
        <Link href={`/user/${data.userId}`}>{data.user}</Link>
      </div>
    </div>
  );
};
