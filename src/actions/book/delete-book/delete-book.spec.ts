import { deleteBook } from "./delete-book";
import { db } from "@/db";
import { redirect } from "next/navigation";

jest.mock("../../../db", () => ({
  db: {
    book: {
      delete: jest.fn(),
    },
  },
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

describe("deleteBook", () => {
  const bookId = 1;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deletes the book and redirects to /bookings", async () => {
    await deleteBook(bookId);

    expect(db.book.delete).toHaveBeenCalledWith({
      where: { id: bookId },
    });

    expect(redirect).toHaveBeenCalledWith("/bookings");
  });

  it("logs an error if the delete operation fails", async () => {
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(jest.fn());

    const error = new Error("Failed to delete book");
    (db.book.delete as jest.Mock).mockRejectedValueOnce(error);

    await deleteBook(bookId);

    expect(db.book.delete).toHaveBeenCalledWith({
      where: { id: bookId },
    });
    expect(consoleErrorSpy).toHaveBeenCalledWith(error);
    expect(redirect).toHaveBeenCalledWith("/bookings");
  });
});
