"use client";

import {
  type ReactNode,
  useState,
  useMemo,
  useCallback,
  useContext,
  SyntheticEvent,
} from "react";
import { DialogContext } from ".";

export interface openDialogProps {
  children: ReactNode;
  onClose: (e: SyntheticEvent<HTMLDialogElement>) => void;
}

export const useDialogHook = () => {
  const [dialog, setDialog] = useState<{
    children: ReactNode;
    open: boolean;
    onClose: (event: SyntheticEvent<HTMLDialogElement>) => void;
  }>({
    children: "",
    open: false,
    onClose: () => null,
  });

  const openDialog = useCallback(
    ({ children, onClose }: openDialogProps) => {
      console.log("create portal");

      const handleOnClose = (event: SyntheticEvent<HTMLDialogElement>) => {
        onClose(event);
        setDialog({
          children: "",
          open: false,
          onClose: () => null,
        });
      };
      setDialog({ children: children, open: true, onClose: handleOnClose });
    },
    [setDialog],
  );

  return useMemo(() => ({ openDialog, dialog }), [openDialog, dialog]);
};

export const useDialog = () => {
  const context = useContext(DialogContext);

  if (!context) throw new Error("Wrap your component with the Dialog Provider");

  return context;
};
