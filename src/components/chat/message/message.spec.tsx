import { render } from "@/test-utils";
import { Message } from "./message";
import { screen } from "@testing-library/react";

const mockedMessage = {
  id: 1,
  createdAt: new Date(),
  text: "message",
  senderId: 1,
  chatId: 1,
};

describe("Message", () => {
  it("should display the message from non connected user", async () => {
    render(await Message({ message: mockedMessage }));

    expect(screen.getByText("message")).toHaveClass("requesterMessage");
  });

  it("should display the message from connected user", async () => {
    render(await Message({ message: { ...mockedMessage, senderId: 4 } }));

    expect(screen.getByText("message")).toHaveClass("connectedUserMessage");
  });
});
