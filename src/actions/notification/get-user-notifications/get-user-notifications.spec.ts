import { getUserNotifications } from "./get-user-notifications";
import { db } from "@/db";
import { getConnectedUserId } from "@/actions/user";
import { Notification } from "@prisma/client";
import { NOTIFICATION_TYPE } from "@/constants";

jest.mock("../../../db", () => ({
  db: {
    user: {
      findUnique: jest.fn(),
    },
    message: {
      findUnique: jest.fn(),
    },
  },
}));

jest.mock("../../user/get-user-info", () => ({
  getConnectedUserId: jest.fn(),
}));

const userId = 1;
const notifications = [
  {
    id: 1,
    type: NOTIFICATION_TYPE.MESSAGE,
    isRead: false,
    createdAt: new Date(),
    messageId: 1,
    bookingId: null,
  },
  {
    id: 2,
    type: NOTIFICATION_TYPE.BOOKING_REQUEST,
    isRead: true,
    createdAt: new Date(),
    messageId: null,
    bookingId: 2,
  },
] as Notification[];

const message = {
  id: 1,
  text: "Test message",
  sender: { username: "testuser" },
  chat: {},
};

describe("getUserNotifications", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return sorted notifications with user details", async () => {
    (getConnectedUserId as jest.Mock).mockResolvedValue(userId);
    (db.user.findUnique as jest.Mock).mockResolvedValue({
      id: userId,
      notifications,
    });
    (db.message.findUnique as jest.Mock).mockResolvedValue(message);

    const result = await getUserNotifications();

    expect(db.user.findUnique).toHaveBeenCalledWith({
      where: { id: userId },
      include: { notifications: true },
    });

    expect(db.message.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: { sender: true, chat: true },
    });

    expect(result).toEqual([
      {
        id: 1,
        bookingId: null,
        isRead: false,
        type: NOTIFICATION_TYPE.MESSAGE,
        createdAt: expect.any(Date),
        username: "testuser",
        messageId: 1,
      },
      {
        id: 2,
        bookingId: 2,
        isRead: true,
        type: NOTIFICATION_TYPE.BOOKING_REQUEST,
        createdAt: expect.any(Date),
      },
    ]);
  });

  it("should return null if userId is not available", async () => {
    (getConnectedUserId as jest.Mock).mockResolvedValue(null);

    const result = await getUserNotifications();

    expect(result).toBeNull();
  });

  it("should return null if user data is not available", async () => {
    (getConnectedUserId as jest.Mock).mockResolvedValue(userId);
    (db.user.findUnique as jest.Mock).mockResolvedValue(null);

    const result = await getUserNotifications();

    expect(result).toBeNull();
  });
});
