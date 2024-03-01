"use client";

import classes from "./filter-books-drawer.module.css";
import clsx from "clsx";
import { Button } from "@/libs/ui-components";
import { FilterBooksForm } from "./filter-books-form";
import { RiCloseFill } from "react-icons/ri";

export const FilterBooksDrawer = ({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: () => void;
}) => {
  const className = clsx(
    `${classes.drawerContainer}`,
    isOpen && `${classes.drawerContainerOpen}`,
  );

  return (
    <div className={className}>
      <Button variant="unstyled" onClick={() => close()}>
        <RiCloseFill size={32} />
      </Button>
      <FilterBooksForm close={() => close()} />
    </div>
  );
};
