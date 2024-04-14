import { Button, useDialog } from "@/libs/ui-components";
import classes from "./cancel-request-dialog.module.css";

interface CancelRequestBookDialogProps {
  cancelRequest: () => Promise<void>;
}

export const CancelRequestBookDialog = ({
  cancelRequest,
}: CancelRequestBookDialogProps) => {
  const { closeDialog } = useDialog();

  const handleOnClick = () => {
    cancelRequest();
    closeDialog();
  };

  return (
    <div className={classes.dialogContainer}>
      <h2>Are you sure you want to cancel your request ?</h2>
      <div className={classes.actionButtons}>
        <Button variant="secondary" onClick={closeDialog}>
          Abort
        </Button>
        <Button onClick={handleOnClick}>Cancel Request</Button>
      </div>
    </div>
  );
};
