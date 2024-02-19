import { capitalize, memberSince } from ".";

describe("capitalize", () => {
  it("should return the string capitalized", () => {
    expect(capitalize("hugo")).toEqual("Hugo");
  });
});

describe("memberSince", () => {
  it("should return a string with month in letters and year", () => {
    expect(memberSince(new Date("2022-01-01"))).toEqual("January 2022");
  });
});
