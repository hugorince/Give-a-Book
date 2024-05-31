import { render } from "@/libs/test-utils";
import { WriteMessage } from "./write-message";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { sendMessage } from "@/libs/server";

const mockSendMessage = jest.fn();

jest.mock("../../../database", () => ({
  sendMessage: jest.fn(),
}));

describe("WriteMessage", () => {
  beforeAll(() => {
    (sendMessage as jest.Mock).mockImplementation(mockSendMessage);
  });
  it("should render the text box", () => {
    render(<WriteMessage chatId={1} />);

    expect(screen.getByLabelText("write message")).toBeVisible();
    expect(screen.getByRole("button", { name: "Send message" })).toBeVisible();
  });

  it("should send the message on submit", async () => {
    render(<WriteMessage chatId={1} />);

    const textarea = screen.getByLabelText("write message");
    const submitButton = screen.getByRole("button", { name: "Send message" });

    await userEvent.type(textarea, "message");

    await userEvent.click(submitButton);

    expect(mockSendMessage).toHaveBeenCalledWith("message", 1);
  });
});
