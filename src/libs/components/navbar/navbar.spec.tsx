import { render, act, screen } from "@testing-library/react";
import { Navbar } from ".";
import { mockSignOut } from "../../../../jest.setup";

describe("Navbar", () => {
  it("should render the Navbar links", async () => {
    await act(async () => render(await Navbar()));

    const logOutButton = screen.getByRole("button", { name: "sign out" });
    logOutButton.click();

    expect(mockSignOut).toHaveBeenCalled();
  });
});
