import { createBooking, requestBook } from "./request-book";
import { calculateDistance } from "@/utils";
import { db } from "@/db";
import { getConnectedUserId } from "@/actions/user";
import { BookPageData } from "@/types";
import { User } from "@prisma/client";

jest.mock("../../../utils", () => ({
  calculateDistance: jest.fn(),
}));

jest.mock("../../../db", () => ({
  db: {
    booking: {
      create: jest.fn(),
    },
    chat: {
      create: jest.fn(),
    },
    notification: {
      create: jest.fn(),
    },
    user: {
      findUnique: jest.fn(),
    },
    message: {
      create: jest.fn(),
    },
  },
}));

jest.mock("../../user/get-user-info", () => ({
  getConnectedUserId: jest.fn(),
}));

const book = {
  id: 1,
  userId: 2,
  gpsCoordinates: [40.7128, -74.006], // Example coordinates
} as BookPageData;

const requester = {
  id: 3,
  gpsCoordinates: [34.0522, -118.2437], // Example coordinates
} as User;

describe("createBooking", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create booking, chat, and notification", async () => {
    (calculateDistance as jest.Mock).mockResolvedValueOnce(100);
    (db.booking.create as jest.Mock).mockResolvedValueOnce({ id: 4 });

    await createBooking(book, requester);

    expect(calculateDistance).toHaveBeenCalledWith(
      book.gpsCoordinates,
      requester.gpsCoordinates,
    );
    expect(db.booking.create).toHaveBeenCalledWith({
      data: {
        status: "REQUESTED",
        requesterId: requester.id,
        ownerId: book.userId,
        bookId: book.id,
        distance: 100,
      },
    });
    expect(db.chat.create).toHaveBeenCalledWith({
      data: {
        requesterId: requester.id,
        ownerId: book.userId,
        bookingId: 4,
      },
    });
    expect(db.notification.create).toHaveBeenCalledWith({
      data: {
        userId: book.userId,
        type: "BOOKING_REQUEST",
        isRead: false,
        bookingId: 4,
      },
    });
  });

  it("should return null if book has no gpsCoordinates", async () => {
    const result = await createBooking(
      { ...book, gpsCoordinates: null },
      requester,
    );

    expect(result).toBeNull();
    expect(calculateDistance).not.toHaveBeenCalled();
    expect(db.booking.create).not.toHaveBeenCalled();
  });

  it("should handle errors", async () => {
    const error = new Error("Test error");
    (calculateDistance as jest.Mock).mockRejectedValueOnce(error);

    console.error = jest.fn();

    await createBooking(book, requester);

    expect(console.error).toHaveBeenCalledWith(error);
  });
});

describe("requestBook", () => {
  const message = "Test message";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create booking, chat, message, and notification", async () => {
    (getConnectedUserId as jest.Mock).mockResolvedValueOnce(3);
    (db.user.findUnique as jest.Mock).mockResolvedValueOnce(requester);
    (calculateDistance as jest.Mock).mockResolvedValueOnce(100);
    (db.booking.create as jest.Mock).mockResolvedValueOnce({ id: 4 });
    (db.chat.create as jest.Mock).mockResolvedValueOnce({ id: 5 });

    await requestBook(book, message);

    expect(getConnectedUserId).toHaveBeenCalled();
    expect(db.user.findUnique).toHaveBeenCalledWith({ where: { id: 3 } });
    expect(calculateDistance).toHaveBeenCalledWith(
      book.gpsCoordinates,
      requester.gpsCoordinates,
    );
    expect(db.booking.create).toHaveBeenCalledWith({
      data: {
        status: "REQUESTED",
        requesterId: requester.id,
        ownerId: book.userId,
        bookId: book.id,
        distance: 100,
      },
    });
    expect(db.chat.create).toHaveBeenCalledWith({
      data: {
        requesterId: requester.id,
        ownerId: book.userId,
        bookingId: 4,
      },
    });
    expect(db.message.create).toHaveBeenCalledWith({
      data: {
        text: message,
        senderId: requester.id,
        chatId: 5,
      },
    });
    expect(db.notification.create).toHaveBeenCalledWith({
      data: {
        userId: book.userId,
        type: "BOOKING_REQUEST",
        isRead: false,
        bookingId: 4,
      },
    });
  });

  it("should return null if no connected user", async () => {
    (getConnectedUserId as jest.Mock).mockResolvedValueOnce(null);

    const result = await requestBook(book, message);

    expect(result).toBeNull();
    expect(db.user.findUnique).not.toHaveBeenCalled();
    expect(calculateDistance).not.toHaveBeenCalled();
    expect(db.booking.create).not.toHaveBeenCalled();
  });

  it("should return null if no requester found", async () => {
    (getConnectedUserId as jest.Mock).mockResolvedValueOnce(3);
    (db.user.findUnique as jest.Mock).mockResolvedValueOnce(null);

    const result = await requestBook(book, message);

    expect(result).toBeNull();
    expect(db.user.findUnique).toHaveBeenCalledWith({ where: { id: 3 } });
    expect(calculateDistance).not.toHaveBeenCalled();
    expect(db.booking.create).not.toHaveBeenCalled();
  });

  it("should return null if book has no gpsCoordinates", async () => {
    (getConnectedUserId as jest.Mock).mockResolvedValueOnce(3);
    (db.user.findUnique as jest.Mock).mockResolvedValueOnce(requester);

    const result = await requestBook(
      { ...book, gpsCoordinates: null },
      message,
    );

    expect(result).toBeNull();
    expect(calculateDistance).not.toHaveBeenCalled();
    expect(db.booking.create).not.toHaveBeenCalled();
  });

  it("should handle errors", async () => {
    const error = new Error("Test error");
    (getConnectedUserId as jest.Mock).mockResolvedValueOnce(3);
    (db.user.findUnique as jest.Mock).mockResolvedValueOnce(requester);
    (calculateDistance as jest.Mock).mockRejectedValueOnce(error);

    console.error = jest.fn();

    await requestBook(book, message);

    expect(console.error).toHaveBeenCalledWith(error);
  });
});
