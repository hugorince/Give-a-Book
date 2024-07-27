import { BOOK_TYPE } from "@/constants";
import { postBook } from "./post-book";
import { db } from "@/db";

jest.mock("../../../db", () => ({
  db: {
    book: {
      create: jest.fn(),
    },
  },
}));

const values = {
  title: "Test Book",
  author: "Test Author",
  description: "A description of the test book",
  image: "image-url",
  exchangeGive: BOOK_TYPE.EXCHANGE,
};

const userId = 1;

describe("postBook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call db.book.create with the correct parameters", async () => {
    await postBook(values, userId);

    expect(db.book.create).toHaveBeenCalledWith({
      data: {
        title: values.title,
        author: values.author,
        description: values.description,
        image: values.image,
        userId: userId,
        type: values.exchangeGive,
      },
    });
  });

  it("should handle missing optional fields correctly", async () => {
    const partialValues = {
      title: "Partial Test Book",
      author: "Test Author",
      description: "",
      image: undefined,
      exchangeGive: BOOK_TYPE.EXCHANGE,
    };

    await postBook(partialValues, userId);

    expect(db.book.create).toHaveBeenCalledWith({
      data: {
        title: partialValues.title,
        author: partialValues.author,
        description: "",
        image: undefined,
        userId: userId,
        type: partialValues.exchangeGive,
      },
    });
  });

  it("should throw an error if db.book.create fails", async () => {
    const errorMessage = "Failed to create book";
    (db.book.create as jest.Mock).mockRejectedValueOnce(
      new Error(errorMessage),
    );

    await expect(postBook(values, userId)).rejects.toThrow(errorMessage);
  });
});
