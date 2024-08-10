"use client";

import type { BookPageData } from "@/types";
import type { Book } from "@prisma/client";
import { Button, useDialog } from "@/ui-kit";
import { useRouter } from "next/navigation";
import { ProposeExchangeDialog } from "../propose-exchange-dialog";
import { proposeExchange } from "@/actions";
import { toast } from "sonner";

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
      toast.error("An error occurred");
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
      onClose: () => console.log("fired"),
    });
  };

  return <Button onClick={openProposeExchangeDialog}>Propose Exchange</Button>;
};
