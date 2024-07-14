"use server";

import type { PropositionGroup } from "@/types";
import { PropositionBook } from "../proposition-book";
import { FaExchangeAlt } from "react-icons/fa";
import classes from "./proposition-card.module.css";
import { RefusePropositionButton } from "../refuse-proposition-button";
import { AcceptPropositionButton } from "../accept-proposition-button/accept-proposition-button";

interface PropositionCardProps {
  proposition: PropositionGroup;
  propositionType: "PROPOSED" | "RECEIVED";
}

export const PropositionCard = ({
  proposition,
  propositionType,
}: PropositionCardProps) => {
  if (!proposition) return null;

  const isProposed = propositionType === "PROPOSED";

  const propositionId =
    proposition.ownedBook?.proposed?.id ||
    proposition.proposedInExchange?.proposed?.id;

  return (
    <div className={classes.container}>
      <div className={classes.booksInfos}>
        <PropositionBook book={proposition.ownedBook} />
        <FaExchangeAlt size={24} />
        <PropositionBook book={proposition.proposedInExchange} />
      </div>
      {propositionId && (
        <div className={classes.ctaContainer}>
          {!isProposed && (
            <AcceptPropositionButton propositionId={propositionId} />
          )}

          <RefusePropositionButton
            propositionId={propositionId}
            label={isProposed ? "Cancel Proposition" : "Refuse Proposition"}
          />
        </div>
      )}
    </div>
  );
};
