"use client";

import { Button, Checkbox } from "@/libs/ui-components";
import { filterBooks } from "@/libs/utils";

export const FilterBooksForm = ({ close }: { close: () => void }) => {
  return (
    <form action={async (formData) => filterBooks(formData)}>
      <div>
        <Checkbox label="Exchange" value="exchange" name="exchange" />
        <Checkbox label="Give" value="give" name="give" />
      </div>
      <Button type="submit" onClick={() => close()}>
        Apply filters
      </Button>
    </form>
  );
};
