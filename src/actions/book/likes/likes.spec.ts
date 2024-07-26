import { updateBookLikes } from "./likes";
import { getConnectedUserId } from "@/actions/user";
import { db } from "@/db";

jest.mock("../../user/get-user-info", () => ({
  getConnectedUserId: jest.fn(),
}));

jest.mock("../../../db", () => ({
  db: {
    book: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  },
}));

describe("updateBookLikes", () => {
  const bookId = 1;
  const userId = 2;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return null if no connected user", async () => {
    (getConnectedUserId as jest.Mock).mockResolvedValueOnce(null);

    const result = await updateBookLikes(bookId);

    expect(result).toBeNull();
    expect(db.book.findUnique).not.toHaveBeenCalled();
    expect(db.book.update).not.toHaveBeenCalled();
  });

  it("should add user to likes if not already liked", async () => {
    (getConnectedUserId as jest.Mock).mockResolvedValueOnce(userId);
    (db.book.findUnique as jest.Mock).mockResolvedValueOnce({
      id: bookId,
      likes: [],
    });

    await updateBookLikes(bookId);

    expect(db.book.findUnique).toHaveBeenCalledWith({ where: { id: bookId } });
    expect(db.book.update).toHaveBeenCalledWith({
      where: { id: bookId },
      data: { likes: { push: userId } },
    });
  });

  it("should remove user from likes if already liked", async () => {
    (getConnectedUserId as jest.Mock).mockResolvedValueOnce(userId);
    (db.book.findUnique as jest.Mock).mockResolvedValueOnce({
      id: bookId,
      likes: [userId],
    });

    await updateBookLikes(bookId);

    expect(db.book.findUnique).toHaveBeenCalledWith({ where: { id: bookId } });
    expect(db.book.update).toHaveBeenCalledWith({
      where: { id: bookId },
      data: { likes: [] },
    });
  });

  it("should not update database if book does not exist", async () => {
    (getConnectedUserId as jest.Mock).mockResolvedValueOnce(userId);
    (db.book.findUnique as jest.Mock).mockResolvedValueOnce(null);

    await updateBookLikes(bookId);

    expect(db.book.findUnique).toHaveBeenCalledWith({ where: { id: bookId } });
    expect(db.book.update).not.toHaveBeenCalled();
  });
});
