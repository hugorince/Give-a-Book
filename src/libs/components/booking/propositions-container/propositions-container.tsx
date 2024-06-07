"use server";

import { PropositionGroup } from "@/libs/types";
import { PropositionCard } from "./proposition-card";
import classes from "./propositions-container.module.css";

interface PropositionsContainerProps {
  propositions: PropositionGroup[];
}

export const PropositionsContainer = ({
  propositions,
}: PropositionsContainerProps) => {
  if (!propositions) return null;

  return (
    <div className={classes.propositionsContainer}>
      {propositions.map((proposition, key) => (
        <PropositionCard key={key} proposition={proposition} />
      ))}
    </div>
  );
};
