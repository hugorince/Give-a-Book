import { BookCard } from ".";
import { screen } from "@testing-library/react";
import { render, mockedBook } from "@/libs/test-utils";

describe("BookCard", () => {
  it("should map the book to display the book infos", async () => {
    render(<BookCard book={mockedBook} connectedUserId="4" />);

    expect(
      screen.getByRole("link", { name: mockedBook.user as string }),
    ).toHaveAttribute("href", `/user/${mockedBook.userId}`);
    expect(
      screen.getByRole("link", { name: mockedBook.title as string }),
    ).toHaveAttribute("href", `/book/${mockedBook.id}`);

    expect(screen.getByRole("heading")).toHaveTextContent("title");
    expect(screen.getByText("Exchange")).toBeInTheDocument();
  });
});
