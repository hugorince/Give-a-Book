import { mockedBookedBook, render } from "@/libs/test-utils";
import { RequestBookContainer } from "./request-book-container";
import { screen } from "@testing-library/react";

describe("RequestBookContainer", () => {
  it("should display the right request possibility when logged in", () => {
    render(
      <RequestBookContainer book={mockedBookedBook} connectedUserId={4} />,
    );

    expect(screen.getByText("This book is available to request")).toBeVisible();
  });

  it("should display the right request possibility when not logged in", () => {
    render(
      <RequestBookContainer
        book={mockedBookedBook}
        connectedUserId={undefined}
      />,
    );

    expect(
      screen.queryByText("This book is available to request"),
    ).not.toBeInTheDocument();
    expect(
      screen.getByText("You must be logged in to request a book"),
    ).toBeVisible();
  });
});
