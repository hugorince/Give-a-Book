import { completeBooking } from "./complete-booking";
import { db } from "@/db";
import { BOOKING_STATUS } from "@/constants";

jest.mock("../../../db", () => ({
  db: {
    booking: {
      update: jest.fn(),
    },
  },
}));

const bookingId = 1;

describe("completeBooking", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call db.booking.update with the correct parameters", async () => {
    await completeBooking(bookingId);

    expect(db.booking.update).toHaveBeenCalledWith({
      where: {
        id: bookingId,
      },
      data: {
        status: BOOKING_STATUS.COMPLETED,
      },
    });
  });

  it("should throw an error if db.booking.update fails", async () => {
    const errorMessage = "Failed to update booking";
    (db.booking.update as jest.Mock).mockRejectedValueOnce(
      new Error(errorMessage),
    );

    await expect(completeBooking(bookingId)).rejects.toThrow(errorMessage);
  });
});
