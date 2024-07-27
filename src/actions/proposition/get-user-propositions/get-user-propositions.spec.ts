import { getUserPropositions } from "./get-user-propositions";
import { getBookById, getBooksByUserId } from "@/actions/book";
import { getConnectedUserId } from "@/actions/user";

jest.mock("../../book/get-books-data", () => ({
  getBookById: jest.fn(),
  getBooksByUserId: jest.fn(),
}));

jest.mock("../../user/get-user-info", () => ({
  getConnectedUserId: jest.fn(),
}));

describe("getUserPropositions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return null if no user is connected", async () => {
    (getConnectedUserId as jest.Mock).mockResolvedValueOnce(null);

    const result = await getUserPropositions();

    expect(result).toBeNull();
    expect(getBooksByUserId).not.toHaveBeenCalled();
    expect(getBookById).not.toHaveBeenCalled();
  });

  it("should return null if user has no books", async () => {
    (getConnectedUserId as jest.Mock).mockResolvedValueOnce(1);
    (getBooksByUserId as jest.Mock).mockResolvedValueOnce(null);

    const result = await getUserPropositions();

    expect(result).toBeNull();
    expect(getBooksByUserId).toHaveBeenCalledWith(1);
    expect(getBookById).not.toHaveBeenCalled();
  });

  it("should return propositions for user's books", async () => {
    const userId = 1;
    const userBooks = [
      { id: 1, proposed: { receiverBookId: 2 }, propositionReceived: null },
      { id: 2, proposed: null, propositionReceived: { proposedBookId: 3 } },
    ];
    const book1 = {
      id: 1,
      proposed: { receiverBookId: 2 },
      propositionReceived: null,
    };
    const book2 = {
      id: 2,
      proposed: null,
      propositionReceived: { proposedBookId: 3 },
    };
    const proposedBook1 = { id: 2 };
    const proposedBook2 = { id: 3 };

    (getConnectedUserId as jest.Mock).mockResolvedValueOnce(userId);
    (getBooksByUserId as jest.Mock).mockResolvedValueOnce(userBooks);
    (getBookById as jest.Mock).mockImplementation((id) => {
      if (id === 2) return Promise.resolve(proposedBook1);
      if (id === 3) return Promise.resolve(proposedBook2);
      return Promise.resolve(null);
    });

    const result = await getUserPropositions();

    expect(getConnectedUserId).toHaveBeenCalled();
    expect(getBooksByUserId).toHaveBeenCalledWith(userId);
    expect(getBookById).toHaveBeenCalledWith(2);
    expect(getBookById).toHaveBeenCalledWith(3);

    expect(result).toEqual({
      booksAskedForExchange: [
        {
          ownedBook: book1,
          proposedInExchange: proposedBook1,
        },
      ],
      booksExchangePropositionReceived: [
        {
          ownedBook: book2,
          proposedInExchange: proposedBook2,
        },
      ],
    });
  });
});
