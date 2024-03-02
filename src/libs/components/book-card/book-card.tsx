import NextLink from "next/link";
import { Link } from "@/libs/ui-components";
import classes from "./book-card.module.css";
import { BooksData } from "@/libs/utils";
import { Chip } from "@/libs/ui-components";

export const BookCard = ({ data }: { data: BooksData }) => {
  const exchangeOrGive = data.exchange ? "Exchange" : "Give";

  return (
    <NextLink href={`/book/${data.id}`} className={classes.wrapper}>
      <div className={classes.chip}>
        <Chip label={exchangeOrGive} exchange={data.exchange} />
      </div>
      <div className={classes.userLink}>
        <p>offered by </p>
        <Link href={`/user/${data.userId}`} variant="unstyled">
          {data.user}
        </Link>
      </div>
      <img src={data.image || ""} alt="" />
      <Link variant="unstyled" href={`/book/${data.id}`}>
        <h3>{data.title}</h3>
      </Link>
    </NextLink>
  );
};
