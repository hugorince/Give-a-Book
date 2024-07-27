import { sendMessage } from "./send-message";
import { db } from "@/db";
import { getConnectedUserId } from "@/actions/user";
import { NOTIFICATION_TYPE } from "@/constants";

jest.mock("../../../db", () => ({
  db: {
    chat: {
      findUnique: jest.fn(),
    },
    message: {
      create: jest.fn(),
    },
    notification: {
      create: jest.fn(),
    },
  },
}));

jest.mock("../../user/get-user-info", () => ({
  getConnectedUserId: jest.fn(),
}));

const userId = 1;
const chatId = 2;
const messageText = "message";
const chat = {
  id: chatId,
  ownerId: 2,
  requesterId: 3,
  booking: { id: 4 },
};
const messageSent = { id: 5 };

describe("sendMessage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should send a message and create a notification", async () => {
    (getConnectedUserId as jest.Mock).mockResolvedValueOnce(userId);
    (db.chat.findUnique as jest.Mock).mockResolvedValueOnce(chat);
    (db.message.create as jest.Mock).mockResolvedValueOnce(messageSent);

    await sendMessage(messageText, chatId);

    expect(getConnectedUserId).toHaveBeenCalled();
    expect(db.chat.findUnique).toHaveBeenCalledWith({
      where: { id: chatId },
      include: { booking: true },
    });
    expect(db.message.create).toHaveBeenCalledWith({
      data: {
        text: messageText,
        chatId: chatId,
        senderId: userId,
      },
    });
    expect(db.notification.create).toHaveBeenCalledWith({
      data: {
        userId: chat.ownerId,
        messageId: messageSent.id,
        type: NOTIFICATION_TYPE.MESSAGE,
        isRead: false,
        bookingId: chat.booking.id,
      },
    });
  });

  it("should return null if no connected user", async () => {
    (getConnectedUserId as jest.Mock).mockResolvedValueOnce(null);

    const result = await sendMessage(messageText, chatId);

    expect(result).toBeNull();
    expect(db.chat.findUnique).not.toHaveBeenCalled();
    expect(db.message.create).not.toHaveBeenCalled();
    expect(db.notification.create).not.toHaveBeenCalled();
  });

  it("should return null if no chat found", async () => {
    (getConnectedUserId as jest.Mock).mockResolvedValueOnce(userId);
    (db.chat.findUnique as jest.Mock).mockResolvedValueOnce(null);

    const result = await sendMessage(messageText, chatId);

    expect(result).toBeNull();
    expect(db.chat.findUnique).toHaveBeenCalledWith({
      where: { id: chatId },
      include: { booking: true },
    });
    expect(db.message.create).not.toHaveBeenCalled();
    expect(db.notification.create).not.toHaveBeenCalled();
  });
});
