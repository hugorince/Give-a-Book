"use server";

import { Button, Checkbox } from "@/libs/ui-components";
import { filterBooks } from "@/libs/utils";

export const FilterBooks = () => {
  return (
    <form action={filterBooks}>
      <Checkbox label="Exchange" value="exchange" name="exchange" />
      <Checkbox label="Give" value="give" name="give" />
      <Button type="submit">Apply filters</Button>
    </form>
  );
};
