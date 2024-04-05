import { Button, useDialog } from "@/libs/ui-components";

interface RequestBookDialogProps {
  proceed: () => Promise<void>;
}

export const RequestBookDialog = ({ proceed }: RequestBookDialogProps) => {
  const { closeDialog } = useDialog();
  return (
    <div>
      <h2>Are you sure you want to request this book ?</h2>
      <Button variant="secondary" onClick={closeDialog}>
        Cancel
      </Button>
      <Button onClick={proceed}>Proceed</Button>
    </div>
  );
};
