import type { BookPageData } from "@/types";
import { proposeExchange } from "./propose-exchange";
import { NOTIFICATION_TYPE, PROPOSITION_STATUS_TYPE } from "@/constants";
import { db } from "@/db";

jest.mock("../../../db", () => ({
  db: {
    proposition: {
      create: jest.fn(),
    },
    notification: {
      create: jest.fn(),
    },
  },
}));

describe("proposeExchange", () => {
  const requestedBook = { id: 1, userId: 2 } as BookPageData;
  const proposedBookId = 3;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a proposition and a notification successfully", async () => {
    await proposeExchange(requestedBook, proposedBookId);

    expect(db.proposition.create).toHaveBeenCalledWith({
      data: {
        status: PROPOSITION_STATUS_TYPE.PENDING,
        proposedBookId: proposedBookId,
        receiverBookId: requestedBook.id,
      },
    });

    expect(db.notification.create).toHaveBeenCalledWith({
      data: {
        userId: requestedBook.userId,
        type: NOTIFICATION_TYPE.PROPOSITION,
        isRead: false,
      },
    });
  });

  it("should handle errors gracefully", async () => {
    const error = new Error("Test error");
    (db.proposition.create as jest.Mock).mockRejectedValueOnce(error);

    console.error = jest.fn();

    await proposeExchange(requestedBook, proposedBookId);

    expect(console.error).toHaveBeenCalledWith(error);
  });
});
