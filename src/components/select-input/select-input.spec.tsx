import { render, RHFWrapper } from "@/test-utils";
import { SelectInput } from "./select-input";
import { screen } from "@testing-library/react";

describe("SelectInput", () => {
  it("should show select button", () => {
    render(
      <RHFWrapper>
        <SelectInput />
      </RHFWrapper>,
    );
  });

  //expect(screen.getByRole("combobox")).toBeInTheDocument();
});
