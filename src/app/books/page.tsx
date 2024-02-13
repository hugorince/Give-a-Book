import { getBooksData } from "@/libs/utils";
import { BookCard } from "@/libs/components";
import classes from "./books.module.css";

export const Books = async () => {
  const displayBooks = await getBooksData();

  return (
    <div>
      <h1>All Books</h1>
      <div className={classes.booksWrapper}>
        {displayBooks.map((book, index) => {
          return <BookCard data={book} key={index} />;
        })}
      </div>
    </div>
  );
};

export default Books;
