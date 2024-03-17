"use client";

import { useMemo, type ReactNode, createContext } from "react";
import { Dialog, openDialogProps, useDialogHook } from ".";
import { createPortal } from "react-dom";

export interface DialogContextType {
  openDialog: any;
}

export const DialogContext = createContext<DialogContextType | null>(null);

export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const { openDialog, dialog } = useDialogHook();
  const value = useMemo(() => ({ openDialog }), [openDialog]);
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
