import clsx from "clsx";
import type { HtmlHTMLAttributes, ReactNode } from "react";
import { Button } from "..";
import { RiCloseFill } from "react-icons/ri";

interface DrawerProps extends HtmlHTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  children: ReactNode;
  close: () => void;
}

export const Drawer = ({ isOpen, children, close }: DrawerProps) => {
  const className = clsx("drawerContainer", isOpen && "drawerContainerOpen");
  return (
    <div className={className}>
      <Button
        onClick={() => close()}
        variant="unstyled"
        className="drawerCloseButton"
      >
        <RiCloseFill size={32} />
      </Button>
      {children}
    </div>
  );
};
