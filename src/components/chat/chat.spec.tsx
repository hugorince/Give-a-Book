import { render } from "@/test-utils";
import { Chat } from "./chat";
import { screen } from "@testing-library/react";

jest.mock("../message", () => ({
  Message: () => <div>message</div>,
}));

const mockedMessages = [
  {
    id: 1,
    createdAt: new Date(),
    text: "message 1",
    senderId: 1,
    chatId: 1,
  },
  {
    id: 1,
    chatId: 2,
    createdAt: new Date(),
    text: "message",
    senderId: 4,
  },
];

describe("Chat", () => {
  it("should display the Chat", () => {
    render(
      <Chat
        messages={mockedMessages}
        userChat={{ id: 1, username: "username" }}
        title="title"
        chatId={1}
      />,
    );

    expect(screen.queryAllByText("message")).toHaveLength(2);
    expect(screen.getByRole("textbox")).toBeVisible();
  });
});
