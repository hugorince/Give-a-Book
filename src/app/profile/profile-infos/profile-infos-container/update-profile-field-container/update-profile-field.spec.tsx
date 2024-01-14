import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { UpdateProfileFieldContainer } from "./update-profile-field-container";
import { useSession } from "next-auth/react";

jest.mock("next-auth/react");
const mockSession = {
  data: {
    user: {
      email: "test@example.com",
    },
  },
  update: jest.fn(),
};

useSession.mockReturnValue(mockSession);

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