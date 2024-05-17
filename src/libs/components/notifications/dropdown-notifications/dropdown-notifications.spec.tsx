import { render } from "@/libs/test-utils";
import { DropdownNotifications } from "./dropdown-notifications";
import { screen } from "@testing-library/react";
import { NotificationType } from "@prisma/client";
import { setNotificationVisibility } from "@/libs/database";
import userEvent from "@testing-library/user-event";

jest.mock("../notification-message", () => ({
  NotificationMessage: ({
    handleNotificationClicked,
  }: {
    handleNotificationClicked: () => void;
  }) => (
    <>
      <button onClick={handleNotificationClicked}>set visibility</button>
      <div>Notification Message</div>
    </>
  ),
}));

jest.mock("../../../database", () => ({
  setNotificationVisibility: jest.fn(),
}));

const mockedNotifications = [
  {
    id: 1,
    bookingId: 1,
    isRead: false,
    type: "MESSAGE" as NotificationType,
    username: "hugo",
  },
  {
    id: 2,
    bookingId: 2,
    isRead: false,
    type: "BOOKING_REQUEST" as NotificationType,
    username: "hugol",
  },
];

const mockSetNotificationVisibility = jest.fn();

describe("DropdownNotifications", () => {
  beforeAll(() => {
    (setNotificationVisibility as jest.Mock).mockImplementation(
      mockSetNotificationVisibility,
    );
  });
  it("should should as many notifications as props", () => {
    render(
      <DropdownNotifications
        notifications={mockedNotifications}
        setIsOpen={jest.fn()}
      />,
    );

    expect(screen.queryAllByText("Notification Message")).toHaveLength(2);
  });

  it("should set the visibility on click", async () => {
    render(
      <DropdownNotifications
        notifications={mockedNotifications}
        setIsOpen={jest.fn()}
      />,
    );

    const button = screen.queryAllByText("set visibility")[0];
    await userEvent.click(button);

    expect(mockSetNotificationVisibility).toHaveBeenCalled();
  });
});
