"use client";

import { Button, useDialog } from "@/libs/ui-components";

export const RequestBook = () => {
  const { openDialog, closeDialog } = useDialog();

  const handleOnClick = () => {
    openDialog({
      children: (
        <div>
          <h2>Are you sure you want to request this book ?</h2>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button>Proceed</Button>
        </div>
      ),
      onClose: () => console.log("fired"),
    });
  };

  return <Button onClick={handleOnClick}>Request book</Button>;
};
