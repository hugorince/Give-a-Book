"use server";

import classes from "./books-cards-wrapper.module.css";
import { getBooksData } from "@/libs/utils";
import { BookCard } from "..";
import { Checkbox } from "@/libs/ui-components";

export const BooksCardWrapper = async () => {
  const displayBooks = await getBooksData();

  const formAction = () => {
    console.log("clicked");
  };

  return (
    <>
      <form action={formAction}>
        <Checkbox label="Exchange" value="exchange" />
        <Checkbox label="Give" value="give" />
      </form>
      <div className={classes.booksWrapper}>
        {displayBooks.map((book, index) => {
          return <BookCard data={book} key={index} />;
        })}
      </div>
    </>
  );
};
