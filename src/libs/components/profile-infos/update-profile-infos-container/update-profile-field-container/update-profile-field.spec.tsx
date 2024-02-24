import { UpdateProfileFieldContainer } from "./update-profile-field-container";
import { render, screen } from "@testing-library/react";

describe("UpdateProfileFieldContainer", () => {
  it("should render UpdateProfileFieldContainer", () => {
    render(
      <UpdateProfileFieldContainer
        handleInputClose={() => {}}
        updateInput="email"
      />,
    );

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
});
