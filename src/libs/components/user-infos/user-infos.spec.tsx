import { act, render, screen } from "@testing-library/react";
import { UserInfos } from "./user-infos";
import { ReactElement } from "react";

jest.mock("../../utils", () => ({
  getUserInfo: jest.fn(),
  capitalize: jest.fn().mockImplementation((str) => str.toUpperCase()),
  memberSince: jest.fn().mockImplementation((date) => date.getFullYear()),
}));

jest.spyOn(require("../../utils"), "getUserInfo").mockResolvedValueOnce({
  id: 1,
  email: "mail@mail.com",
  username: "username",
  createdAt: new Date("2022-01-01"),
});

describe("UserInfos", () => {
  it("renders user information correctly", async () => {
    await act(async () => {
      render((await UserInfos({ userId: "1" })) as ReactElement);
    });

    expect(screen.getByText("USERNAME")).toBeInTheDocument();
    expect(screen.getByText("member since 2022")).toBeInTheDocument();
  });
});
