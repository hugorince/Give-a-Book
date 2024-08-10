"use client";

import { Button, useDialog } from "@/ui-kit";
import { useRouter } from "next/navigation";
import { deleteProposition } from "@/actions";
import { DialogBox } from "@/components/dialog-box";
import { toast } from "sonner";

interface RefusePropositionButtonProps {
  propositionId: number;
  label: string;
}

export const RefusePropositionButton = ({
  propositionId,
  label,
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
    closeDialog();
    try {
      await deleteProposition(propositionId);
      toast.success("The proposition has been canceled");
      router.refresh();
    } catch (err) {
      toast.error("An error occurred");
    }
  };

  return (
    <Button variant="secondary" onClick={openRefusePropositionDialog}>
      {label}
    </Button>
  );
};
