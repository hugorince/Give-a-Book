"use client";

import { useFilterBooks } from "@/libs/providers";
import { Button, Checkbox } from "@/libs/ui-components";
import { filterBooks } from "@/libs/utils";

export const FilterBooksForm = ({ close }: { close: () => void }) => {
  const { setFiltersFormData } = useFilterBooks();

  const formAction = async (formData: FormData) => {
    await filterBooks(formData);
    setFiltersFormData(formData);
  };

  return (
    <form action={formAction}>
      <div>
        <Checkbox label="Exchange" value="exchange" name="exchange" />
        <Checkbox label="Give" value="give" name="give" />
        <Checkbox label="Liked" value="liked" name="liked" />
      </div>
      <Button type="submit" onClick={() => close()}>
        Apply filters
      </Button>
    </form>
  );
};
