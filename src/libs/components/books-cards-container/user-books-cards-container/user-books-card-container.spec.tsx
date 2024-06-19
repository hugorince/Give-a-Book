import { screen } from "@testing-library/react";
import { getBooksByUserIdLegacy } from "../../../server-actions";
import { render, mockBooksData } from "@/libs/test-utils";
import { UserBooksCardsContainer } from ".";

jest.mock("../../../server-actions", () => ({
  ...jest.requireActual<any>("../../../server-actions"),
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
