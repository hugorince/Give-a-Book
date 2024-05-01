"use client";

import { useDrawer } from "@/libs/hooks";
import { Button, Drawer } from "@/libs/ui-components";
import { FilterBooksForm } from "./filter-books-form";

export const FilterBooks = () => {
  const { open, isOpen, close } = useDrawer();

  return (
    <div>
      <Button onClick={() => open()}>filter</Button>
      <Drawer isOpen={isOpen} close={close}>
        <FilterBooksForm closeDrawer={close} />
      </Drawer>
    </div>
  );
};
