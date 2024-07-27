import { db } from "@/db";
import { updateNotificationVisibility } from "./update-notification-visibility";

jest.mock("../../../db", () => ({
  db: {
    notification: {
      update: jest.fn(),
    },
  },
}));

describe("updateNotificationVisibility", () => {
  const notificationId = 1;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update the notification to read", async () => {
    (db.notification.update as jest.Mock).mockResolvedValue({});

    await updateNotificationVisibility(notificationId);

    expect(db.notification.update).toHaveBeenCalledWith({
      where: { id: notificationId },
      data: {
        isRead: true,
      },
    });
    expect(db.notification.update).toHaveBeenCalledTimes(1);
  });
});
