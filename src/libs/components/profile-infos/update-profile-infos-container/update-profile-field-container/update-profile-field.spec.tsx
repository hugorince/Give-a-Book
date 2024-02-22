import { UpdateProfileFieldContainer } from "./update-profile-field-container";
import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";

jest.mock("next/navigation");

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
