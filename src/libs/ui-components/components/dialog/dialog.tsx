"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { Button } from "..";
import { IoCloseSharp } from "react-icons/io5";

interface DialogProps {
  children: ReactNode;
}

export const Dialog = ({ children }: DialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const closeDialog = () => {
    if (dialogRef.current) dialogRef.current.close();
  };

  //   useEffect(() => {
  //     if (openDialog && dialogRef.current) {
  //       dialogRef.current.showModal();
  //     } else {
  //       dialogRef.current.close();
  //     }
  //   }, [openDialog]);

  return (
    <dialog ref={dialogRef}>
      <div>
        <Button variant="unstyled" onClick={closeDialog}>
          <IoCloseSharp size={24} />
        </Button>
        <div>{children}</div>
      </div>
    </dialog>
  );
};
