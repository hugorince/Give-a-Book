import {
  getBookingInfos,
  getUserBookedBooks,
  getUserBookings,
} from "./get-booking-info";
import { db } from "@/db";
import { getConnectedUserId, getUserInfo } from "@/actions/user";
import { BOOK_TYPE } from "@/constants";

jest.mock("../../../db", () => ({
  db: {
    booking: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
    chat: {
      findUnique: jest.fn(),
    },
  },
}));

jest.mock("../../user/get-user-info", () => ({
  getConnectedUserId: jest.fn(),
  getUserInfo: jest.fn(),
}));

const bookingId = 1;
const connectedUserId = 1;
const booking = {
  id: bookingId,
  chat: { id: 1 },
  ownerId: connectedUserId,
  requesterId: 2,
};
const chat = {
  id: 1,
  messages: [],
};
const userChatUserName = {
  id: 2,
  username: "testuser",
};

describe("getBookingInfos", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return booking info with chat messages and userChat details", async () => {
    (getConnectedUserId as jest.Mock).mockResolvedValueOnce(connectedUserId);
    (db.booking.findUnique as jest.Mock).mockResolvedValueOnce(booking);
    (db.chat.findUnique as jest.Mock).mockResolvedValueOnce(chat);
    (getUserInfo as jest.Mock).mockResolvedValueOnce(userChatUserName);

    const result = await getBookingInfos(bookingId);

    expect(result).toEqual({
      ...booking,
      messages: chat.messages,
      userChat: {
        id: userChatUserName.id,
        username: userChatUserName.username,
      },
    });
  });

  it("should return null if booking chat is not found", async () => {
    (getConnectedUserId as jest.Mock).mockResolvedValueOnce(connectedUserId);
    (db.booking.findUnique as jest.Mock).mockResolvedValueOnce({
      ...booking,
      chat: null,
    });

    const result = await getBookingInfos(bookingId);

    expect(result).toBeNull();
  });

  it("should return null if connectedUserId is not found", async () => {
    (getConnectedUserId as jest.Mock).mockResolvedValueOnce(null);

    const result = await getBookingInfos(bookingId);

    expect(result).toBeNull();
  });
});

describe("getUserBookedBooks", () => {
  const bookings = [
    {
      id: 1,
      book: {
        id: 1,
        type: BOOK_TYPE.EXCHANGE,
        userId: 1,
      },
      ownerId: connectedUserId,
      distance: 10,
      owner: { username: "owner1" },
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return user booked books with additional properties", async () => {
    (getConnectedUserId as jest.Mock).mockResolvedValueOnce(connectedUserId);

    const result = await getUserBookedBooks(bookings);

    expect(result).toEqual([
      {
        ...bookings[0].book,
        exchange: true,
        give: false,
        requested: true,
        distance: bookings[0].distance,
        bookingId: bookings[0].id,
        ownerId: bookings[0].book.userId,
        username: bookings[0].owner.username,
      },
    ]);
  });

  it("should return null if connectedUserId is not found", async () => {
    (getConnectedUserId as jest.Mock).mockResolvedValueOnce(null);

    const result = await getUserBookedBooks(bookings);

    expect(result).toBeNull();
  });

  it("should return null if connectedUserId is not found", async () => {
    (getConnectedUserId as jest.Mock).mockResolvedValueOnce(null);

    const result = await getUserBookings();

    expect(result).toBeNull();
  });
});
