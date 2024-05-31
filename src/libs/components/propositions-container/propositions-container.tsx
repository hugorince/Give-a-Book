import { PropositionCard } from "./proposition-card";

interface PropositionsContainerProps {
  propositions: any[];
}

export const PropositionsContainer = ({
  propositions,
}: PropositionsContainerProps) => {
  return (
    <>
      {propositions.map((proposition, key) => (
        <PropositionCard key={key} proposition={proposition} />
      ))}
    </>
  );
};
