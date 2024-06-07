import type { PropositionGroup } from "@/libs/types";
import classes from "./proposition-card.module.css";

interface PropositionCardProps {
  proposition: PropositionGroup;
}

export const PropositionCard = ({ proposition }: PropositionCardProps) => {
  console.log({ proposition });
  if (!proposition) return null;

  return (
    <div className={classes.container}>
      <div className={classes.bookInfos}>
        <div>
          <div>{proposition.ownedBook.title}</div>
          {proposition.ownedBook.image && (
            <img src={proposition.ownedBook.image} alt="" />
          )}
        </div>
        <div>
          <div>{proposition.proposedInExchange.title}</div>
          {proposition.proposedInExchange.image && (
            <img src={proposition.proposedInExchange.image} alt="" />
          )}
        </div>
      </div>
    </div>
  );
};
