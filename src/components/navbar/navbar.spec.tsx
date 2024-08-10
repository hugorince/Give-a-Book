import { screen } from "@testing-library/react";
import { Navbar } from ".";
import { render } from "@/test-utils";

jest.mock("../../actions", () => ({
  getBooksWithoutConnectedUser: jest.fn(),
  getUserNotifications: jest.fn(),
}));

describe("Navbar", () => {
  it("should render the Navbar links", async () => {
    render(await Navbar());

    expect(screen.getByRole("button", { name: "sign out" })).toBeVisible();

    expect(screen.getByRole("link", { name: "Books" })).toHaveAttribute(
      "href",
      "/books",
    );
    expect(screen.getByRole("link", { name: "Add book" })).toHaveAttribute(
      "href",
      "/post-book",
    );
  });
});
