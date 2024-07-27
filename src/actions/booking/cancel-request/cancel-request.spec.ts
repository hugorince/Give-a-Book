import { cancelRequest } from "./cancel-request";
import { db } from "@/db";
import { getConnectedUserId } from "@/actions/user";

jest.mock("../../../db", () => ({
  db: {
    booking: {
      findFirst: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

jest.mock("../../user/get-user-info", () => ({
  getConnectedUserId: jest.fn(),
}));

const bookId = 1;
const userId = 2;

describe("cancelRequest", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should delete booking if it exists", async () => {
    (getConnectedUserId as jest.Mock).mockResolvedValueOnce(userId);
    (db.booking.findFirst as jest.Mock).mockResolvedValueOnce({ id: 3 });

    await cancelRequest(bookId);

    expect(db.booking.findFirst).toHaveBeenCalledWith({
      where: { bookId: bookId },
    });
    expect(db.booking.delete).toHaveBeenCalledWith({
      where: { id: 3 },
    });
  });

  it("should return null if no connected user", async () => {
    (getConnectedUserId as jest.Mock).mockResolvedValueOnce(null);

    const result = await cancelRequest(bookId);

    expect(result).toBeNull();
    expect(db.booking.findFirst).not.toHaveBeenCalled();
    expect(db.booking.delete).not.toHaveBeenCalled();
  });

  it("should return null if no booking found", async () => {
    (getConnectedUserId as jest.Mock).mockResolvedValueOnce(userId);
    (db.booking.findFirst as jest.Mock).mockResolvedValueOnce(null);

    const result = await cancelRequest(bookId);

    expect(result).toBeNull();
    expect(db.booking.findFirst).toHaveBeenCalledWith({
      where: { bookId: bookId },
    });
    expect(db.booking.delete).not.toHaveBeenCalled();
  });

  it("should handle errors", async () => {
    const error = new Error("Test error");
    (getConnectedUserId as jest.Mock).mockResolvedValueOnce(userId);
    (db.booking.findFirst as jest.Mock).mockRejectedValueOnce(error);

    console.error = jest.fn();

    await cancelRequest(bookId);

    expect(console.error).toHaveBeenCalledWith(error);
  });
});
