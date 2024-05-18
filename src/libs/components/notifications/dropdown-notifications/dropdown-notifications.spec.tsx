import { render, mockedNotifications } from "@/libs/test-utils";
import { DropdownNotifications } from "./dropdown-notifications";
import { screen } from "@testing-library/react";
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
