import { updateUser } from "./update-user";
import { db } from "@/db";

jest.mock("../../../db", () => ({
  db: {
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  },
}));

const mockSessionEmail = "test@example.com";
const mockExistingUser = {
  email: mockSessionEmail,
  username: "oldUsername",
  postalCode: "12345",
};

describe("updateUser", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update username if provided", async () => {
    (db.user.findUnique as jest.Mock).mockResolvedValue(mockExistingUser);
    const newValues = { username: "newUsername", email: "", postalCode: "" };

    await updateUser(newValues, mockSessionEmail);

    expect(db.user.findUnique).toHaveBeenCalledWith({
      where: { email: mockSessionEmail },
    });
    expect(db.user.update).toHaveBeenCalledWith({
      where: { email: mockSessionEmail },
      data: { username: "newUsername" },
    });
  });

  it("should update email if provided", async () => {
    (db.user.findUnique as jest.Mock).mockResolvedValue(mockExistingUser);
    const newValues = {
      username: "",
      email: "new@example.com",
      postalCode: "",
    };

    await updateUser(newValues, mockSessionEmail);

    expect(db.user.findUnique).toHaveBeenCalledWith({
      where: { email: mockSessionEmail },
    });
    expect(db.user.update).toHaveBeenCalledWith({
      where: { email: mockSessionEmail },
      data: { email: "new@example.com" },
    });
  });

  it("should update postalCode if provided", async () => {
    (db.user.findUnique as jest.Mock).mockResolvedValue(mockExistingUser);
    const newValues = { username: "", email: "", postalCode: "54321" };

    await updateUser(newValues, mockSessionEmail);

    expect(db.user.findUnique).toHaveBeenCalledWith({
      where: { email: mockSessionEmail },
    });
    expect(db.user.update).toHaveBeenCalledWith({
      where: { email: mockSessionEmail },
      data: { postalCode: "54321" },
    });
  });

  it("should handle cases where no user is found", async () => {
    (db.user.findUnique as jest.Mock).mockResolvedValue(null);
    const newValues = { username: "newUsername", email: "", postalCode: "" };

    await updateUser(newValues, mockSessionEmail);

    expect(db.user.findUnique).toHaveBeenCalledWith({
      where: { email: mockSessionEmail },
    });

    expect(db.user.update).not.toHaveBeenCalled();
  });
});
