import { render, screen, act } from "@testing-library/react";
import { ProfileTitle } from "./profile-title";

jest.mock("next-auth", () => ({
  getServerSession: jest.fn().mockReturnValueOnce({
    user: {
      username: "test user",
    },
  }),
}));

describe("ProfileTitle component", () => {
  it("renders the correct username in the h1 element", async () => {
    await act(async () => {
      render(await ProfileTitle());
    });

    expect(screen.getByText("Welcome test user")).toBeInTheDocument();
  });
});
