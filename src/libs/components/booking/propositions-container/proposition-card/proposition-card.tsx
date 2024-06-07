"use server";

import type { PropositionGroup } from "@/libs/types";
import { PropositionBook } from "./proposition-book";
import { FaExchangeAlt } from "react-icons/fa";
import classes from "./proposition-card.module.css";
import { Button } from "@/libs/ui-components";
import { RefusePropositionButton } from "./refuse-proposition-button";

interface PropositionCardProps {
  proposition: PropositionGroup;
}

export const PropositionCard = ({ proposition }: PropositionCardProps) => {
  if (!proposition) return null;

  const propositionId =
    proposition.ownedBook?.proposed[0]?.id ||
    proposition.proposedInExchange?.proposed[0]?.id;

  return (
    <div className={classes.container}>
      <div className={classes.booksInfos}>
        <PropositionBook book={proposition.ownedBook} />
        <FaExchangeAlt size={24} />
        <PropositionBook book={proposition.proposedInExchange} />
      </div>
      <div className={classes.ctaContainer}>
        <Button>Accept Proposition</Button>
        <RefusePropositionButton propositionId={propositionId} />
      </div>
    </div>
  );
};
