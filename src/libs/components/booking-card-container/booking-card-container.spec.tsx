import { render, mockedBookedBook } from "@/libs/test-utils";
import { BookingCardContainer } from "./booking-card-container";
import { screen } from "@testing-library/react";

jest.mock("../booking-card", () => ({
  BookingCard: () => <p>Booking Card</p>,
}));

describe("BookingCardContainer", () => {
  it("should return as many books as booked by connected user", async () => {
    render(
      await BookingCardContainer({
        books: [mockedBookedBook, mockedBookedBook],
      }),
    );

    expect(screen.queryAllByText("Booking Card")).toHaveLength(2);
  });
});
