"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { Button } from "..";
import { IoCloseSharp } from "react-icons/io5";

interface DialogProps {
  children: ReactNode;
  open: boolean;
}

export const Dialog = ({ children, open, ...props }: DialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const closeDialog = () => {
    if (dialogRef.current) dialogRef.current.close();
  };

  useEffect(() => {
    if (dialogRef.current) {
      if (open) {
        dialogRef.current.removeAttribute("open");
        dialogRef.current.showModal();
      } else {
        dialogRef.current.close();
      }
    }
  }, [dialogRef, open]);

  return (
    <dialog ref={dialogRef} {...props} className="dialog">
      <Button variant="unstyled" onClick={closeDialog}>
        <IoCloseSharp size={24} />
      </Button>
      <div className="dialog--content">{children}</div>
    </dialog>
  );
};

Dialog.displayName = "Dialog";
