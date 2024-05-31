"use client";

import type { BookPageData } from "@/libs/types";
import { Button, useDialog } from "@/libs/ui-components";
import { useRouter } from "next/navigation";
import { ProposeExchangeDialog } from "../propose-exchange-dialog";
import { proposeExchange } from "@/libs/server";

interface ProposeExchangeButtonProps {
  book: BookPageData;
}

export const ProposeExchangeButton = ({ book }: ProposeExchangeButtonProps) => {
  const { openDialog, closeDialog } = useDialog();
  const router = useRouter();

  const proceed = async (proposedBookId: number) => {
    await proposeExchange(book.id, proposedBookId);
  };

  const openProposeExchangeDialog = () => {
    openDialog({
      children: <ProposeExchangeDialog proceed={proceed} />,
      onClose: () => console.log("fired"),
    });
  };

  return <Button onClick={openProposeExchangeDialog}>Propose Exchange</Button>;
};
