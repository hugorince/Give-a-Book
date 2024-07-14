"use server";

import { PropositionGroup } from "@/types";
import { PropositionCard } from "../proposition-card";
import classes from "./propositions-container.module.css";

interface PropositionsContainerProps {
  propositions: PropositionGroup[];
  type: "PROPOSED" | "RECEIVED";
}

export const PropositionsContainer = ({
  propositions,
  type,
}: PropositionsContainerProps) => {
  if (!propositions) return null;

  return (
    <div className={classes.propositionsContainer}>
      {propositions.map((proposition, key) => (
        <PropositionCard
          key={key}
          proposition={proposition}
          propositionType={type}
        />
      ))}
    </div>
  );
};
