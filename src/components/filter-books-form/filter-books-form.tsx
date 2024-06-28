"use client";

import { Button, Checkbox } from "@/ui-kit";
import { filterBooks } from "@/actions";

export const FilterBooksForm = ({
  closeDrawer,
}: {
  closeDrawer: () => void;
}) => {
  const formAction = async (formData: FormData) => {
    await filterBooks(formData);
  };

  return (
    <form action={formAction}>
      <div>
        <Checkbox label="Exchange" value="exchange" name="exchange" />
        <Checkbox label="Give" value="give" name="give" />
        <Checkbox label="Liked" value="liked" name="liked" />
      </div>
      <Button type="submit" onClick={closeDrawer}>
        Apply filters
      </Button>
    </form>
  );
};