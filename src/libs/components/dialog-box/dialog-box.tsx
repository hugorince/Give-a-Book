"use client";

import { Button, useDialog } from "@/libs/ui-components";
import classes from "./dialog-box.module.css";

interface DialogBoxProps {
  cta: () => void;
  label: string;
}

export const DialogBox = ({ label, cta }: DialogBoxProps) => {
  const { closeDialog } = useDialog();

  return (
    <div className={classes.dialogContainer}>
      <h2>{label}</h2>
      <div className={classes.actionButtons}>
        <Button type="button" variant="secondary" onClick={closeDialog}>
          Cancel
        </Button>
        <Button onClick={cta}>Proceed</Button>
      </div>
    </div>
  );
};
