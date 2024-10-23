"use client";

import type { BookPageData } from "@/types";
import type { Book } from "@prisma/client";
import { Button, useDialog } from "@/ui-kit";
import { useRouter } from "next/navigation";
import { ProposeExchangeDialog } from "../propose-exchange-dialog";
import { proposeExchange } from "@/actions";
import { toast } from "sonner";
import { TOASTER_GENERIC_ERROR_MESSAGE } from "@/constants";

interface ProposeExchangeButtonProps {
  book: BookPageData;
  connectedUserBooks: Book[];
}

export const ProposeExchangeButton = ({
  book,
  connectedUserBooks,
}: ProposeExchangeButtonProps) => {
  const { openDialog, closeDialog } = useDialog();
  const router = useRouter();

  const proceed = async (proposedBookId: number) => {
    closeDialog();
    try {
      await proposeExchange(book, proposedBookId);
      router.refresh();
      toast.success("Your proposition has been sent");
    } catch (err) {
      toast.error(TOASTER_GENERIC_ERROR_MESSAGE);
    }
  };

  const openProposeExchangeDialog = () => {
    openDialog({
      children: (
        <ProposeExchangeDialog
          proceed={proceed}
          connectedUserBooks={connectedUserBooks}
        />
      ),
    });
  };

  return <Button onClick={openProposeExchangeDialog}>Propose Exchange</Button>;
};
