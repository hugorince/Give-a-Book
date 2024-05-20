import { render } from "@/libs/test-utils";
import { NotConnectedRequestBook } from "./not-connected-request-book";
import { screen } from "@testing-library/react";

describe("NotConnectedRequestBook", () => {
  it("should show links to log in and sign up", () => {
    render(<NotConnectedRequestBook />);

    expect(screen.getByRole("link", { name: "Log in" })).toBeVisible();
    expect(screen.getByRole("link", { name: "Sign up" })).toBeVisible();
  });
});
