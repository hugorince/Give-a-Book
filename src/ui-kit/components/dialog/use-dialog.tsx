"use client";

import {
  type ReactNode,
  type SyntheticEvent,
  useState,
  useMemo,
  useCallback,
  useContext,
} from "react";
import { DialogContext } from ".";

export interface openDialogProps {
  children: ReactNode;
  onClose?: (e: SyntheticEvent<HTMLDialogElement>) => void;
}

export const useDialogHook = () => {
  const [dialog, setDialog] = useState<{
    children: ReactNode;
    open: boolean;
    onClose: ((event: SyntheticEvent<HTMLDialogElement>) => void) | undefined;
  }>({
    children: "",
    open: false,
    onClose: undefined,
  });

  const openDialog = useCallback(
    ({ children, onClose }: openDialogProps) => {
      const handleOnClose = (event: SyntheticEvent<HTMLDialogElement>) => {
        onClose?.(event);
        setDialog({
          children: "",
          open: false,
          onClose: undefined,
        });
      };
      setDialog({ children: children, open: true, onClose: handleOnClose });
    },
    [setDialog],
  );

  const closeDialog = useCallback(() => {
    setDialog({
      children: "",
      open: false,
      onClose: undefined,
    });
  }, [setDialog]);

  return useMemo(
    () => ({ openDialog, dialog, closeDialog }),
    [openDialog, dialog, closeDialog],
  );
};

export const useDialog = () => {
  const context = useContext(DialogContext);

  if (!context) throw new Error("Wrap your component with the Dialog Provider");

  return context;
};
