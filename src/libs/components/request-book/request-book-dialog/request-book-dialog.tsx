import { Button, useDialog } from "@/libs/ui-components";
import classes from "./request-book-dialog.module.css";

interface RequestBookDialogProps {
  proceed: () => Promise<void>;
}

export const RequestBookDialog = ({ proceed }: RequestBookDialogProps) => {
  const { closeDialog } = useDialog();
  return (
    <div className={classes.dialogContainer}>
      <h2>Are you sure you want to request this book ?</h2>
      <div className={classes.actionButtons}>
        <Button variant="secondary" onClick={closeDialog}>
          Cancel
        </Button>
        <Button onClick={proceed}>Proceed</Button>
      </div>
    </div>
  );
};
