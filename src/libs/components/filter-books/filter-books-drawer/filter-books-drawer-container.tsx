"use client";

import type { ReactNode } from "react";
import { useDrawer } from "@/libs/hooks";
import { OpenDrawerButton } from "./open-drawer-button";
import { FilterBooksDrawer } from "./filter-books-drawer";

export const FilterBooksDrawerContainer = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { toggleDrawer, isOpen, close } = useDrawer();

  return (
    <div>
      <OpenDrawerButton toggleDrawer={() => toggleDrawer()} />
      <FilterBooksDrawer isOpen={isOpen} close={() => close()}>
        {children}
      </FilterBooksDrawer>
    </div>
  );
};
