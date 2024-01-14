import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ProfileInfos } from "./profile-infos";
import { useSession } from "next-auth/react";

jest.mock("next-auth/react");

const mockSession = {
  update: jest.fn(),
  data: {
    user: {
      email: "test@example.com",
      username: "hugo",
    },
  },
  status: "authenticated",
};

const mockUseSession = useSession as jest.MockedFunction<typeof useSession>;
mockUseSession.mockReturnValue(mockSession);

describe("ProfileInfos", () => {
  it("should render the component", () => {
    render(<ProfileInfos />);

    expect(screen.getByText("test@example.com"));
    expect(screen.getByText("hugo"));
  });
});
