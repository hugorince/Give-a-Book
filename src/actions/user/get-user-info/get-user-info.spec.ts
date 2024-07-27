import { getUserInfo, getConnectedUserId } from "./get-user-info";
import { db } from "@/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/actions/auth/auth";

jest.mock("../../../db", () => ({
  db: {
    user: {
      findUnique: jest.fn(),
    },
  },
}));

jest.mock("next-auth", () => ({
  getServerSession: jest.fn(),
}));

const mockUserId = 1;
const mockUser = { id: mockUserId, username: "testuser" };
const mockSession = { user: { id: mockUserId.toString() } };

describe("User Info and Authentication", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getUserInfo", () => {
    it("should return user info for a valid user ID", async () => {
      (db.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const result = await getUserInfo(mockUserId);

      expect(db.user.findUnique).toHaveBeenCalledWith({
        where: { id: mockUserId },
      });
      expect(result).toEqual(mockUser);
    });

    it("should return null if no user is found", async () => {
      (db.user.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await getUserInfo(mockUserId);

      expect(db.user.findUnique).toHaveBeenCalledWith({
        where: { id: mockUserId },
      });
      expect(result).toBeNull();
    });
  });

  describe("getConnectedUserId", () => {
    it("should return the user ID from the session if user is authenticated", async () => {
      (getServerSession as jest.Mock).mockResolvedValue(mockSession);

      const result = await getConnectedUserId();

      expect(getServerSession).toHaveBeenCalledWith(authOptions);
      expect(result).toBe(mockUserId);
    });

    it("should return undefined if there is no session", async () => {
      (getServerSession as jest.Mock).mockResolvedValue(null);

      const result = await getConnectedUserId();

      expect(getServerSession).toHaveBeenCalledWith(authOptions);
      expect(result).toBeUndefined();
    });
  });
});
