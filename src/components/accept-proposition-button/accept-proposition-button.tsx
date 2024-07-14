"use client";

import { Button, useDialog } from "@/ui-kit";
import { RequestBookDialog } from "../request-book-dialog";
import { completeProposition } from "@/actions";
import { useRouter } from "next/navigation";

interface RequestBookProps {
  propositionId: number;
}

export const AcceptPropositionButton = ({
  propositionId,
}: RequestBookProps) => {
  const { openDialog, closeDialog } = useDialog();
  const router = useRouter();

  const proceed = async (message: string) => {
    await completeProposition(propositionId, message);
    closeDialog();
    router.refresh();
  };

  const openRequestBookDialog = () => {
    openDialog({
      children: <RequestBookDialog proceed={proceed} />,
      onClose: () => console.log("fired"),
    });
  };

  return <Button onClick={openRequestBookDialog}>Accept proposition</Button>;
};
