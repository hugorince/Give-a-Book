import { render, act, screen } from "@testing-library/react";
import { Navbar } from ".";
import { mockSignOut } from "../../../../jest.setup";

describe("Navbar", () => {
  it("should render the Navbar links", async () => {
    await act(async () => render(await Navbar()));

    const logOutButton = screen.getByRole("link", { name: "sign out" });
    logOutButton.click();

    expect(mockSignOut).toHaveBeenCalled();
    expect(screen.getByRole("link", { name: "Books" })).toHaveAttribute(
      "href",
      "/books",
    );
    expect(screen.getByRole("link", { name: "Add book" })).toHaveAttribute(
      "href",
      "/books/post-book",
    );
  });
});
