import type { BooksData } from "../book-utils";

export const mockedBook: BooksData = {
  id: 1,
  title: "title",
  author: "author",
  image: "image",
  description: "description",
  user: "user",
  userId: 2,
  exchange: true,
  give: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  likes: [1],
  postalCode: "75018",
  requested: false,
};
