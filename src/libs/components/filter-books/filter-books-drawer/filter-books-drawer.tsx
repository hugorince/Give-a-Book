import { ReactNode } from "react";
import classes from "./filter-books-drawer.module.css";
import clsx from "clsx";
import { Button } from "@/libs/ui-components";

export const FilterBooksDrawer = ({
  isOpen,
  close,
  children,
}: {
  isOpen: boolean;
  close: () => void;
  children: ReactNode;
}) => {
  const className = clsx(
    `${classes.drawerContainer}`,
    isOpen && `${classes.drawerContainerOpen}`,
  );

  return (
    <div className={className}>
      <Button variant="unstyled" onClick={() => close()}>
        close
      </Button>
      {children}
    </div>
  );
};
