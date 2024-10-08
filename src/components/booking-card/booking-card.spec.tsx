import { BookingCard } from ".";
import { screen } from "@testing-library/react";
import { render, mockedBookedBook, mockedUser } from "@/test-utils";

describe("BookingCard", () => {
  it("should map the book to display the book infos", async () => {
    render(
      <BookingCard book={mockedBookedBook} connectedUserId={mockedUser.id} />,
    );

    expect(
      screen.getByRole("link", { name: mockedBookedBook.username as string }),
    ).toHaveAttribute("href", `/user/${mockedBookedBook.userId}`);
    expect(
      screen.getByRole("link", { name: mockedBookedBook.title as string }),
    ).toHaveAttribute("href", `/book/${mockedBookedBook.id}`);
    expect(
      screen.queryByRole("button", { name: "Delete Book" }),
    ).not.toBeInTheDocument();
  });
});
