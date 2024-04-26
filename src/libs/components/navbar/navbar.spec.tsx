import { screen } from "@testing-library/react";
import { Navbar } from ".";
import { mockSignOut } from "../../../../jest.setup";
import { render } from "../../utils/test-utils/test-utils";

describe("Navbar", () => {
  it("should render the Navbar links", async () => {
    render(<Navbar />);

    const logOutButton = screen.getByRole("button", { name: "sign out" });
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
