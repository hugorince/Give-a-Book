"use client";

import { useDrawer } from "@/libs/hooks";
import { Drawer } from "@/libs/ui-components";
import { OpenFilterBooksDrawerButton } from "./filter-books-button";
import { FilterBooksForm } from "./filter-books-form";

export const FilterBooks = () => {
  const { open, isOpen, close } = useDrawer();

  return (
    <div>
      <OpenFilterBooksDrawerButton open={() => open()} />
      <Drawer isOpen={isOpen} close={close}>
        <FilterBooksForm close={() => close()} />
      </Drawer>
    </div>
  );
};
