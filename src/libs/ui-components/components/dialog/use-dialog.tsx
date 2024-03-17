import { createPortal } from "react-dom";
import { ReactNode } from "react";

export const useDialog = () => {
  const openDialog = (children: ReactNode) => {
    createPortal(<>{children}</>, document.body);
  };
  return { openDialog };
};
