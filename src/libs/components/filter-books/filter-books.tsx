"use server";

import { Button, Checkbox } from "@/libs/ui-components";
import { filterBooks } from "@/libs/utils";
import classes from "./filter-books.module.css";

export const FilterBooks = () => {
  return (
    <form action={filterBooks} className={classes.container}>
      <div>
        <Checkbox label="Exchange" value="exchange" name="exchange" />
        <Checkbox label="Give" value="give" name="give" />
      </div>
      <Button type="submit">Apply filters</Button>
    </form>
  );
};
