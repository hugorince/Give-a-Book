import { render, screen, act } from "@testing-library/react";
import { BooksCardContainer } from ".";
import { getBooksData } from "../../utils";

jest.mock("../../utils", () => ({
  ...jest.requireActual<any>("../../utils"),
  getBooksData: jest.fn().mockReturnValue({}),
}));

const mockBookData = [
  { id: 1, likes: [6], give: true, title: "book to give" },
  { id: 2, likes: [4], give: false, exchange: true, title: "book to exchange" },
];

describe("BookCardContainer", () => {
  beforeEach(() => {
    (getBooksData as jest.Mock).mockReturnValue(mockBookData);
  });
  it("should render the filtered selection of books", async () => {
    await act(async () => {
      render(await BooksCardContainer({ searchParams: { filter: "give" } }));
    });

    expect(screen.getByText("book to give")).toBeInTheDocument();
    expect(screen.queryByText("book to exchange")).not.toBeInTheDocument();
  });

  it("should render the filtered selection of books", async () => {
    await act(async () => {
      render(await BooksCardContainer({ searchParams: { filter: "liked" } }));
    });

    expect(screen.getByText("book to exchange")).toBeInTheDocument();
    expect(screen.queryByText("book to give")).not.toBeInTheDocument();
  });
});
