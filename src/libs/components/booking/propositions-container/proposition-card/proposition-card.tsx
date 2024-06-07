"use client";

import type { PropositionGroup } from "@/libs/types";
import { PropositionBook } from "./proposition-book";
import { FaExchangeAlt } from "react-icons/fa";
import classes from "./proposition-card.module.css";
import { Button } from "@/libs/ui-components";
import { deleteProposition } from "@/libs/server";
import { useRouter } from "next/navigation";

interface PropositionCardProps {
  proposition: PropositionGroup;
}

export const PropositionCard = ({ proposition }: PropositionCardProps) => {
  const router = useRouter();

  if (!proposition) return null;

  const refuseProposition = async () => {
    const propositionId =
      proposition.ownedBook?.proposed[0].id ||
      proposition.proposedInExchange?.proposed[0].id;

    await deleteProposition(propositionId);
    router.refresh();
  };

  const acceptProposition = () => {};

  return (
    <div className={classes.container}>
      <div className={classes.booksInfos}>
        <PropositionBook book={proposition.ownedBook} />
        <FaExchangeAlt size={24} />
        <PropositionBook book={proposition.proposedInExchange} />
      </div>
      <div className={classes.ctaContainer}>
        <Button onClick={acceptProposition}>Accept Proposition</Button>
        <Button variant="secondary" onClick={refuseProposition}>
          Refuse Proposition
        </Button>
      </div>
    </div>
  );
};
