import { BookingCard } from ".";
import { screen } from "@testing-library/react";
import { render } from "@/libs/utils/test-utils/test-utils";
import { mockedBook, mockedUser } from "@/libs/utils";

describe("BookingCard", () => {
  it("should map the book to display the book infos", async () => {
    render(<BookingCard book={mockedBook} connectedUser={mockedUser} />);

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
