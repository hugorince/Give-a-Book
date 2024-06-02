import classes from "./proposition-card.module.css";

export const PropositionCard = ({ proposition }) => {
  console.log({ proposition });
  return (
    <div className={classes.container}>
      <div className={classes.bookInfos}>
        <div>
          <div>{proposition.ownedBook.title}</div>
          <img src={proposition.ownedBook.image} alt="" />
        </div>
        <div>
          <div>{proposition.proposedInExchange.title}</div>
          <img src={proposition.proposedInExchange.image} alt="" />
        </div>
      </div>
    </div>
  );
};
