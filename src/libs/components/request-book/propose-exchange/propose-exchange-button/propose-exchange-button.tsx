"use client";

import type { BookData, BookPageData } from "@/libs/types";
import { Button, useDialog } from "@/libs/ui-components";
import { useRouter } from "next/navigation";
import { ProposeExchangeDialog } from "../propose-exchange-dialog";
import { proposeExchange } from "@/libs/server";
import type { Book } from "@prisma/client";

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
    await proposeExchange(book.id, proposedBookId);
    closeDialog();
    router.refresh();
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
