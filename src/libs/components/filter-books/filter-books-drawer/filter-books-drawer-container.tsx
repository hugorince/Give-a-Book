"use client";

import { useDrawer } from "@/libs/hooks";
import { OpenDrawerButton } from "./open-drawer-button";
import { FilterBooksDrawer } from "./filter-books-drawer";

export const FilterBooksDrawerContainer = () => {
  const { open, isOpen, close } = useDrawer();

  return (
    <div>
      <OpenDrawerButton open={() => open()} />
      <FilterBooksDrawer isOpen={isOpen} close={() => close()} />
    </div>
  );
};
