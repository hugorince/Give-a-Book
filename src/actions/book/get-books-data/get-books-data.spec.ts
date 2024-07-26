import {
  getBookById,
  getBooksData,
  getConnectedUserBooks,
  getBooksByUserId,
} from "./get-books-data";
import { db } from "@/db";
import { getConnectedUserId, getUserInfo } from "@/actions";
import { BOOK_TYPE, BOOKING_STATUS } from "@/constants";

jest.mock("../../../db", () => ({
  db: {
    book: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

jest.mock("../../user/get-user-info", () => ({
  getConnectedUserId: jest.fn(),
  getUserInfo: jest.fn(),
}));

jest.mock("../../../utils", () => ({
  calculateDistance: jest.fn(),
}));

describe("getBookById", () => {
  it("returns null if book is not found", async () => {
    (db.book.findUnique as jest.Mock).mockResolvedValueOnce(null);

    const result = await getBookById(1);

    expect(result).toBeNull();
  });

  it("returns book data with additional properties if book is found", async () => {
    const book = {
      id: 1,
      type: BOOK_TYPE.EXCHANGE,
      user: {
        username: "testuser",
        postalCode: "12345",
        gpsCoordinates: [1, 2],
      },
      booking: { status: BOOKING_STATUS.REQUESTED },
      proposed: true,
      propositionReceived: true,
    };

    (db.book.findUnique as jest.Mock).mockResolvedValueOnce(book);

    const result = await getBookById(1);

    expect(result).toEqual({
      ...book,
      exchange: true,
      give: false,
      username: "testuser",
      postalCode: "12345",
      gpsCoordinates: [1, 2],
      requested: true,
      completed: false,
    });
  });
});

describe("getBooksData", () => {
  it("returns books data with additional properties", async () => {
    const books = [
      {
        id: 1,
        title: "Book 1",
        type: BOOK_TYPE.EXCHANGE,
        userId: 1,
        booking: { status: BOOKING_STATUS.REQUESTED },
        proposed: true,
        propositionReceived: true,
      },
    ];

    const user = {
      username: "testuser",
      postalCode: "12345",
      gpsCoordinates: [1, 2],
    };

    (db.book.findMany as jest.Mock).mockResolvedValueOnce(books);
    (getUserInfo as jest.Mock).mockResolvedValueOnce(user);

    const result = await getBooksData();

    expect(result).toEqual([
      {
        id: 1,
        title: "Book 1",
        author: undefined,
        image: undefined,
        description: undefined,
        username: "testuser",
        userId: 1,
        exchange: true,
        give: false,
        createdAt: undefined,
        updatedAt: undefined,
        likes: undefined,
        postalCode: "12345",
        gpsCoordinates: [1, 2],
        requested: true,
        completed: false,
        proposed: true,
        propositionReceived: true,
      },
    ]);
  });
});

describe("getConnectedUserBooks", () => {
  it("returns null if no connected user", async () => {
    (getConnectedUserId as jest.Mock).mockResolvedValueOnce(null);

    const result = await getConnectedUserBooks();

    expect(result).toBeNull();
  });
});

describe("getBooksByUserId", () => {
  it("returns books for a given user ID", async () => {
    const books = [{ id: 1 }, { id: 2 }];

    (db.book.findMany as jest.Mock).mockResolvedValueOnce(books);

    const result = await getBooksByUserId(1);

    expect(result).toEqual(books);
  });
});
