import { getInitials } from ".";

describe("getInitials", () => {
  it("should return the initial of connected user", () => {
    expect(getInitials("ugo")).toEqual("U");
  });
});
