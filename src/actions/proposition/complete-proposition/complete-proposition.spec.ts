import { completeProposition } from "./complete-proposition";
import { db } from "@/db";
import { createBooking, requestBook } from "../../booking/request-book";
import { getBookById } from "@/actions/book/get-books-data";
import { PROPOSITION_STATUS_TYPE } from "@/constants";

jest.mock("../../../db", () => ({
  db: {
    proposition: {
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

jest.mock("../../booking/request-book", () => ({
  createBooking: jest.fn(),
  requestBook: jest.fn(),
}));

jest.mock("../../book/get-books-data", () => ({
  getBookById: jest.fn(),
}));

const propositionId = 1;
const message = "Test message";
const proposition = {
  id: propositionId,
  proposedBook: { id: 1, user: { id: 2 } },
  receiverBook: { id: 2, user: { id: 3 } },
};
const bookData = { id: 1, user: { id: 2 } };

describe("completeProposition", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should complete the proposition successfully", async () => {
    (db.proposition.update as jest.Mock).mockResolvedValueOnce(proposition);
    (getBookById as jest.Mock).mockResolvedValueOnce(bookData);
    (getBookById as jest.Mock).mockResolvedValueOnce(bookData);

    await completeProposition(propositionId, message);

    expect(db.proposition.update).toHaveBeenCalledWith({
      where: { id: propositionId },
      data: { status: PROPOSITION_STATUS_TYPE.ACCEPTED },
      include: { proposedBook: true, receiverBook: true },
    });

    expect(getBookById).toHaveBeenCalledWith(proposition.receiverBook.id);
    expect(getBookById).toHaveBeenCalledWith(proposition.proposedBook.id);
    expect(requestBook).toHaveBeenCalledWith(bookData, message);
    expect(createBooking).toHaveBeenCalledWith(bookData, bookData.user);
    expect(db.proposition.delete).toHaveBeenCalledWith({
      where: { id: proposition.id },
    });
  });

  it("should return null if receiverBookData is not found", async () => {
    (db.proposition.update as jest.Mock).mockResolvedValueOnce(proposition);
    (getBookById as jest.Mock).mockResolvedValueOnce(null);

    const result = await completeProposition(propositionId, message);

    expect(result).toBeNull();
    expect(requestBook).not.toHaveBeenCalled();
    expect(createBooking).not.toHaveBeenCalled();
    expect(db.proposition.delete).not.toHaveBeenCalled();
  });

  it("should return null if proposedBookData is not found", async () => {
    (db.proposition.update as jest.Mock).mockResolvedValueOnce(proposition);
    (getBookById as jest.Mock).mockResolvedValueOnce(bookData);
    (getBookById as jest.Mock).mockResolvedValueOnce(null);

    const result = await completeProposition(propositionId, message);

    expect(result).toBeNull();
    expect(requestBook).not.toHaveBeenCalled();
    expect(createBooking).not.toHaveBeenCalled();
    expect(db.proposition.delete).not.toHaveBeenCalled();
  });

  it("should handle errors", async () => {
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(jest.fn());
    const errorMessage = "Failed to complete proposition";

    (db.proposition.update as jest.Mock).mockRejectedValueOnce(
      new Error(errorMessage),
    );

    await completeProposition(propositionId, message);

    expect(consoleErrorSpy).toHaveBeenCalledWith(new Error(errorMessage));
  });
});
