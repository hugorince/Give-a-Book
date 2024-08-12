"use client";

import { Button, Checkbox } from "@/ui-kit";
import { filterBooks } from "@/actions";
import classes from "./filter-books-form.module.css";

export const FilterBooksForm = ({
  closeDrawer,
}: {
  closeDrawer: () => void;
}) => {
  const formAction = async (formData: FormData) => {
    await filterBooks(formData);
  };

  return (
    <form action={formAction} className={classes.formWrapper}>
      <div className={classes.checkboxes}>
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
