import { createUser } from "./create-user";
import { db } from "@/db";
import { hash } from "bcrypt";

jest.mock("bcrypt", () => ({
  hash: jest.fn(),
}));

global.fetch = jest.fn();

jest.mock("../../../db", () => ({
  db: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}));

const validUser = {
  email: "test@example.com",
  username: "testuser",
  postalCode: "75001",
  password: "password123",
  confirmPassword: "password123",
};

const hashedPassword = "hashedpassword";

describe("createUser", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new user if email and username are unique", async () => {
    (db.user.findUnique as jest.Mock).mockResolvedValueOnce(null);
    (db.user.findUnique as jest.Mock).mockResolvedValueOnce(null);
    (hash as jest.Mock).mockResolvedValue(hashedPassword);
    (fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        features: [{ geometry: { coordinates: [1.234, 5.678] } }],
      }),
    });

    await createUser(validUser);

    expect(db.user.findUnique).toHaveBeenCalledTimes(2);
    expect(db.user.findUnique).toHaveBeenCalledWith({
      where: { email: validUser.email },
    });
    expect(db.user.findUnique).toHaveBeenCalledWith({
      where: { username: validUser.username },
    });
    expect(hash).toHaveBeenCalledWith(validUser.password, 10);
    expect(db.user.create).toHaveBeenCalledWith({
      data: {
        email: validUser.email,
        username: validUser.username,
        postalCode: validUser.postalCode,
        gpsCoordinates: [1.234, 5.678],
        password: hashedPassword,
      },
    });
  });

  it("should not create a new user if username already exists", async () => {
    (db.user.findUnique as jest.Mock).mockResolvedValueOnce(null);
    (db.user.findUnique as jest.Mock).mockResolvedValueOnce(validUser);

    await createUser(validUser);

    expect(db.user.findUnique).toHaveBeenCalledTimes(2);
    expect(db.user.findUnique).toHaveBeenCalledWith({
      where: { email: validUser.email },
    });
    expect(db.user.findUnique).toHaveBeenCalledWith({
      where: { username: validUser.username },
    });
    expect(db.user.create).not.toHaveBeenCalled();
  });

  it("should handle errors", async () => {
    const error = new Error("Database error");
    (db.user.findUnique as jest.Mock).mockRejectedValue(error);

    console.error = jest.fn();

    await createUser(validUser);

    expect(console.error).toHaveBeenCalledWith(error);
  });
});
