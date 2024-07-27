import { signOut } from "./user-utils";
import { signOut as nextAuthSignOut } from "next-auth/react";

jest.mock("next-auth/react", () => ({
  signOut: jest.fn(),
}));

describe("signOut function", () => {
  it("should call nextAuthSignOut with the correct callbackUrl", async () => {
    await signOut();

    expect(nextAuthSignOut).toHaveBeenCalledWith({ callbackUrl: "/login" });
    expect(nextAuthSignOut).toHaveBeenCalledTimes(1);
  });
});
