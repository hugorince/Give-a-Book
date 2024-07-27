import { db } from "@/db";
import { deleteProposition } from "./delete-proposition";

jest.mock("../../../db", () => ({
  db: {
    proposition: {
      delete: jest.fn(),
    },
  },
}));

const propositionId = 1;

describe("deleteProposition", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should delete the proposition if a valid propositionId is provided", async () => {
    await deleteProposition(propositionId);

    expect(db.proposition.delete).toHaveBeenCalledWith({
      where: { id: propositionId },
    });
  });

  it("should return null if propositionId is not provided", async () => {
    const result = await deleteProposition(null as unknown as number);

    expect(result).toBeNull();
    expect(db.proposition.delete).not.toHaveBeenCalled();
  });

  it("should return null if propositionId is undefined", async () => {
    const result = await deleteProposition(undefined as unknown as number);

    expect(result).toBeNull();
    expect(db.proposition.delete).not.toHaveBeenCalled();
  });

  it("should throw an error if db.proposition.delete throws an error", async () => {
    const errorMessage = "Error deleting proposition";
    (db.proposition.delete as jest.Mock).mockRejectedValueOnce(
      new Error(errorMessage),
    );

    await expect(deleteProposition(propositionId)).rejects.toThrow(
      errorMessage,
    );
  });
});
