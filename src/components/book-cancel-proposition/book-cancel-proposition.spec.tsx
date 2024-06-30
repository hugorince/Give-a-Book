import { mockedBookPage, render } from "@/test-utils";
import { BookCancelProposition } from "./book-cancel-proposition";
import { screen } from "@testing-library/react";

describe("BookCancelProposition", () => {
  it("should show the refuse proposition button", () => {
    render(
      <BookCancelProposition
        book={{
          ...mockedBookPage,
          proposed: {
            id: 1,
            createdAt: new Date(),
            status: "PENDING",
            proposedBookId: 1,
            receiverBookId: 2,
          },
        }}
      />,
    );

    expect(screen.getByText("Refuse Proposition")).toBeVisible();
  });

  it("should not show the refuse proposition button if book not proposed", () => {
    render(<BookCancelProposition book={mockedBookPage} />);

    expect(screen.queryByText("Refuse Proposition")).not.toBeInTheDocument();
  });
});
