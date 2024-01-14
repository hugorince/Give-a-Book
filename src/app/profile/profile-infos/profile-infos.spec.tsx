import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ProfileInfos } from "./profile-infos";
import { getServerSession } from "next-auth";

jest.mock("next-auth");

const mockSession = {
  user: {
    email: "test@example.com",
    username: "username",
  },
};

getServerSession.mockResolvedValue(mockSession);

describe("ProfileInfos", () => {
  it("should render the component", () => {
    render(<ProfileInfos />);

    expect(screen.getByText("test@example.com"));
  });
});
