import { render } from "@/libs/test-utils";
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
  it("should display the message", async () => {
    render(await Message({ message: mockedMessage }));
  });

  expect(screen.queryByText("message")).toBeInTheDocument();
});
