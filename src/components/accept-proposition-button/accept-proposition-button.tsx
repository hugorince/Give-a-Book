"use client";

import { Button, useDialog } from "@/ui-kit";
import { RequestBookDialog } from "../request-book-dialog";
import { completeProposition } from "@/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TOASTER_GENERIC_ERROR_MESSAGE } from "@/constants";

interface RequestBookProps {
  propositionId: number;
}

export const AcceptPropositionButton = ({
  propositionId,
}: RequestBookProps) => {
  const { openDialog, closeDialog } = useDialog();
  const router = useRouter();

  const proceed = async (message: string) => {
    closeDialog();

    try {
      await completeProposition(propositionId, message);
      router.refresh();
      toast.success("The proposition has been accepted");
    } catch (err) {
      toast.error(TOASTER_GENERIC_ERROR_MESSAGE);
    }
  };

  const openRequestBookDialog = () => {
    openDialog({
      children: <RequestBookDialog proceed={proceed} />,
    });
  };

  return <Button onClick={openRequestBookDialog}>Accept proposition</Button>;
};
