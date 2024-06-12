import type { PropositionGroup } from "@/libs/types";
import { render } from "@/libs/test-utils";
import { screen } from "@testing-library/react";
import { PropositionsContainer } from "./propositions-container";

jest.mock("./proposition-card", () => ({
  PropositionCard: () => <div>PropositionCard</div>,
}));

describe("PropositionContainer", () => {
  it("should display as many propositions as received", () => {
    render(
      <PropositionsContainer
        propositions={[{}, {}] as unknown as PropositionGroup[]}
      />,
    );

    expect(screen.getAllByText("PropositionCard")).toHaveLength(2);
  });
});
