import { act, screen } from "@testing-library/react";
import { UserInfos } from "./user-infos";
import { render } from "@/test-utils";

jest.mock("../../utils", () => ({
  getUserInfo: jest.fn().mockResolvedValue({
    username: "username",
    createdAt: new Date("2022-01-01"),
  }),
  capitalize: jest.fn().mockImplementation((str) => str.toUpperCase()),
  memberSince: jest.fn().mockImplementation((date) => date.getFullYear()),
}));

jest.mock("../../actions", () => ({
  getUserInfo: jest.fn().mockResolvedValue({
    username: "username",
    createdAt: new Date("2022-01-01"),
  }),
}));

describe("UserInfos", () => {
  it("renders user information correctly", async () => {
    await act(async () => {
      render(await UserInfos({ userId: 22 }));
    });

    expect(screen.getByText("USERNAME")).toBeInTheDocument();
    expect(screen.getByText("member since 2022")).toBeInTheDocument();
  });
});
