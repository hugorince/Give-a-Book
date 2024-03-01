"use server";

import { Button, Checkbox } from "@/libs/ui-components";
import { filterBooks } from "@/libs/utils";

export const FilterBooksForm = () => {
  return (
    <form action={filterBooks}>
      <div>
        <Checkbox label="Exchange" value="exchange" name="exchange" />
        <Checkbox label="Give" value="give" name="give" />
      </div>
      <Button type="submit">Apply filters</Button>
    </form>
  );
};
