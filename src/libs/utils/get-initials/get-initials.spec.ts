import { waitFor } from "@testing-library/react";
import { getInitials } from ".";

jest.mock("next-auth", () => ({
  getServerSession: jest.fn(),
}));

jest.spyOn(require("next-auth"), "getServerSession").mockResolvedValueOnce({
  user: {
    username: "user",
  },
});

describe("getInitials", () => {
  it("should return the initial of connected user", async () => {
    await waitFor(() => expect(getInitials()).resolves.toEqual("U"));
  });
});
