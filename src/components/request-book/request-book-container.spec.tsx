import { mockedBookPage, mockedProposition, render } from "@/test-utils";
import { RequestBookContainer } from "./request-book-container";
import { screen } from "@testing-library/react";
import { getIsAlreadyRequestedForExchangeByConnectedUser } from "@/actions";

jest.mock("../book-already-requested", () => ({
  BookAlreadyRequested: () => <div>BookAlreadyRequested</div>,
}));

jest.mock("../not-connected-request-book", () => ({
  NotConnectedRequestBook: () => <div>NotConnectedRequestBook</div>,
}));

jest.mock("../book-new-request", () => ({
  BookNewRequest: () => <div>BookNewRequest</div>,
}));

jest.mock("../book-cancel-request", () => ({
  BookCancelRequest: () => <div>BookCancelRequest</div>,
}));

jest.mock("../propose-exchange", () => ({
  ProposeExchange: () => <div>ProposeExchange</div>,
}));

jest.mock("../book-cancel-proposition", () => ({
  BookCancelProposition: () => <div>BookCancelProposition</div>,
}));

jest.mock("../../actions", () => ({
  getIsAlreadyRequestedForExchangeByConnectedUser: jest
    .fn()
    .mockReturnValue(false),
}));

describe("RequestBookContainer", () => {
  it("should display the right request possibility when logged in and exchange true", async () => {
    render(
      await RequestBookContainer({ book: mockedBookPage, connectedUserId: 4 }),
    );

    expect(screen.getByText("ProposeExchange")).toBeVisible();
  });

  it("should display the right request possibility when logged and own book", async () => {
    render(
      await RequestBookContainer({
        book: { ...mockedBookPage, userId: 4 },
        connectedUserId: 4,
      }),
    );

    expect(
      screen.getByText(
        "This book is proposed by you, you can cancel this proposition",
      ),
    ).toBeVisible();
  });

  it("should display the right request possibility when logged in and exchange false", async () => {
    render(
      await RequestBookContainer({
        book: { ...mockedBookPage, exchange: false, give: true },
        connectedUserId: 4,
      }),
    );

    expect(screen.getByText("BookNewRequest")).toBeVisible();
  });

  it("should display the right request possibility when logged in and already proposed", async () => {
    (
      getIsAlreadyRequestedForExchangeByConnectedUser as jest.Mock
    ).mockReturnValueOnce(true);
    render(
      await RequestBookContainer({
        book: { ...mockedBookPage, proposed: mockedProposition },
        connectedUserId: 4,
      }),
    );

    expect(screen.getByText("BookCancelProposition")).toBeVisible();
  });

  it("should display the right request possibility when logged in and already proposed to another user", async () => {
    render(
      await RequestBookContainer({
        book: {
          ...mockedBookPage,
          proposed: { ...mockedProposition, proposedBookId: 3 },
        },
        connectedUserId: 4,
      }),
    );

    expect(screen.getByText("BookAlreadyRequested")).toBeVisible();
  });

  it("should display the right request possibility when not logged in", async () => {
    render(
      await RequestBookContainer({
        book: mockedBookPage,
        connectedUserId: undefined,
      }),
    );
    expect(screen.getByText("NotConnectedRequestBook")).toBeVisible();
  });
});
