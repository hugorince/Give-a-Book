"use client";

import { useDrawer } from "@/libs/hooks";
import { Button, Drawer } from "@/libs/ui-components";
import { FilterBooksForm } from "./filter-books-form";
import { FilterBooksProvider } from "@/libs/providers";

export const FilterBooks = () => {
  const { open, isOpen, close } = useDrawer();

  return (
    <FilterBooksProvider>
      <div>
        <Button onClick={() => open()}>filter</Button>
        <Drawer isOpen={isOpen} close={close}>
          <FilterBooksForm close={() => close()} />
        </Drawer>
      </div>
    </FilterBooksProvider>
  );
};
