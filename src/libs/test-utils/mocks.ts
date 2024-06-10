import type { NotificationType, User } from "@prisma/client";
import type { BookData, BookedBook } from "@/libs/types";

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

export const mockedBookedBook: BookedBook = {
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
  requested: false,
  distance: 10,
  bookingId: 1,
  gpsCoordinates: [],
};

export const mockedUser: User = {
  id: 4,
  email: "mail@mail.com",
  username: "username",
  password: "password",
  postalCode: "75018",
  gpsCoordinates: [0, 0],
  createdAt: new Date("2024/04/02"),
  updatedAt: new Date("2024/04/02"),
};

export const mockBooksData = [
  { id: 1, likes: [6], give: true, title: "book to give" },
  { id: 2, likes: [4], give: false, exchange: true, title: "book to exchange" },
  {
    id: 3,
    likes: [4],
    give: true,
    exchange: false,
    title: "book liked to give",
  },
];

export const mockedNotifications = [
  {
    id: 1,
    bookingId: 1,
    isRead: false,
    type: "MESSAGE" as NotificationType,
    username: "hugo",
  },
  {
    id: 2,
    bookingId: 2,
    isRead: true,
    type: "BOOKING_REQUEST" as NotificationType,
    username: "hugol",
  },
];

export const mockedGoogleApiBooks = [
  {
    title: "title",
    authors: ["author 1"],
    description: "description",
    image: "imageUrl",
  },
  {
    title: "title 2",
    authors: ["author 2"],
    description: "description 2",
    image: "imageUrl 2",
  },
  {
    title: "title 3",
    authors: ["author 3"],
    description: "description 3",
    image: "imageUrl 3",
  },
];
