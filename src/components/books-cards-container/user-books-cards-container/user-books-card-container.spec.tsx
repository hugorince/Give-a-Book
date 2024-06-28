import { screen } from "@testing-library/react";
import { getBooksByUserIdLegacy } from "../../../actions";
import { render, mockBooksData } from "@/test-utils";
import { UserBooksCardsContainer } from ".";

jest.mock("../../../actions", () => ({
  ...jest.requireActual<any>("../../../actions"),
  getBooksByUserIdLegacy: jest.fn(),
}));

jest.mock("../book-card", () => ({
  BookCard: () => <div>Book Card</div>,
}));

describe("UserBooksCardContainer", () => {
  beforeEach(() => {
    (getBooksByUserIdLegacy as jest.Mock).mockReturnValue(mockBooksData);
  });
  it("should return all the books of the user", async () => {
    render(await UserBooksCardsContainer({ userId: 4 }));

    expect(screen.queryAllByText("Book Card")).toHaveLength(3);
  });
});
