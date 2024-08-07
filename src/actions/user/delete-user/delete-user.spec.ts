import { db } from "@/db";
import { deleteUser } from "./delete-user";

const mockDeleteUser = jest.fn();

jest.mock("../../../db", () => ({
  db: {
    user: {
      delete: jest.fn(),
    },
  },
}));

describe("deleteUser", () => {
  it("should delete the user", async () => {
    (db.user.delete as jest.Mock).mockImplementation(mockDeleteUser);
    await deleteUser(1);

    expect(mockDeleteUser).toHaveBeenCalledWith({ where: { id: 1 } });
  });
});
