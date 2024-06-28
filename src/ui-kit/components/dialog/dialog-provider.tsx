"use client";

import { useMemo, type ReactNode, createContext } from "react";
import { Dialog, useDialogHook } from ".";
import { createPortal } from "react-dom";

type OpenDialogProps = {
  children: ReactNode;
  onClose: () => void;
};
export interface DialogContextType {
  openDialog: (OpenDialogProps: OpenDialogProps) => void;
  closeDialog: () => void;
}

export const DialogContext = createContext<DialogContextType | null>(null);

export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const { openDialog, dialog, closeDialog } = useDialogHook();
  const value = useMemo(
    () => ({ openDialog, closeDialog }),
    [openDialog, closeDialog],
  );
  const displayPortal = typeof document !== "undefined" && dialog.open;
  const { children: dialogBoxChildren, ...dialogProps } = dialog;

  return (
    <DialogContext.Provider value={value}>
      {children}
      {displayPortal &&
        createPortal(
          <Dialog {...dialogProps}>{dialogBoxChildren}</Dialog>,
          document.body,
        )}
    </DialogContext.Provider>
  );
};
