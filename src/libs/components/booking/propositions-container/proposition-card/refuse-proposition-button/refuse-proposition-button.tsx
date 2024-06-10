"use client";

import { Button, useDialog } from "@/libs/ui-components";
import { useRouter } from "next/navigation";
import { deleteProposition } from "@/libs/server-actions";
import { DialogBox } from "@/libs/components/dialog-box";

interface RefusePropositionButtonProps {
  propositionId: number;
}

export const RefusePropositionButton = ({
  propositionId,
}: RefusePropositionButtonProps) => {
  const router = useRouter();
  const { openDialog, closeDialog } = useDialog();

  const openRefusePropositionDialog = () => {
    openDialog({
      children: (
        <DialogBox
          cta={refuseProposition}
          label="Are you sure you want to cancel this proposition?"
        />
      ),
      onClose: () => console.log("fired"),
    });
  };

  const refuseProposition = async () => {
    await deleteProposition(propositionId);
    closeDialog();
    router.refresh();
  };

  return (
    <Button variant="secondary" onClick={openRefusePropositionDialog}>
      Refuse Proposition
    </Button>
  );
};
