import { User } from "@prisma/client";
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

export const mockedUser: User = {
  id: 4,
  email: "mail@ùail.com",
  username: "username",
  password: "password",
  postalCode: "75018",
  createdAt: new Date("2024/04/02"),
  updatedAt: new Date("2024/04/02"),
};
