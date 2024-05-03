import { User } from "@prisma/client";
import type { BookData } from "@/libs/types";

export const mockedBook: BookData = {
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
  gpsCoordinates: [0, 0],
};

export const mockedUser: User = {
  id: 4,
  email: "mail@ùail.com",
  username: "username",
  password: "password",
  postalCode: "75018",
  gpsCoordinates: [0, 0],
  createdAt: new Date("2024/04/02"),
  updatedAt: new Date("2024/04/02"),
};
