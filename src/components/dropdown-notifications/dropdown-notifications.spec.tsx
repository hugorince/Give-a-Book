import { render, mockedNotifications } from "@/test-utils";
import { DropdownNotifications } from "./dropdown-notifications";
import { screen } from "@testing-library/react";
import { updateNotificationVisibility } from "@/actions";
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

jest.mock("../../actions", () => ({
  updateNotificationVisibility: jest.fn(),
}));

const mockUpdateNotificationVisibility = jest.fn();

describe("DropdownNotifications", () => {
  beforeAll(() => {
    (updateNotificationVisibility as jest.Mock).mockImplementation(
      mockUpdateNotificationVisibility,
    );
  });
  it("should should as many notifications as props", () => {
    render(<DropdownNotifications notifications={mockedNotifications} />);

    expect(screen.queryAllByText("Notification Message")).toHaveLength(2);
  });

  it("should set the visibility on click", async () => {
    render(<DropdownNotifications notifications={mockedNotifications} />);

    const button = screen.queryAllByText("set visibility")[0];
    await userEvent.click(button);

    expect(mockUpdateNotificationVisibility).toHaveBeenCalled();
  });
});
