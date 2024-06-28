import type {
  Booking,
  NotificationType,
  Proposition,
  User,
} from "@prisma/client";
import type { BookData, BookPageData, BookedBook } from "@/types";
import type { NotificationProps } from "../components";

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
  { id: 1, likes: [6], give: true, title: "book to give", requested: false },
  {
    id: 2,
    likes: [2],
    give: false,
    exchange: true,
    title: "book to exchange",
    requested: false,
  },
  {
    id: 3,
    likes: [2],
    give: true,
    exchange: false,
    title: "book liked to give",
    requested: false,
  },
];

export const mockedNotifications: NotificationProps[] = [
  {
    id: 1,
    createdAt: new Date(),
    bookingId: 1,
    isRead: false,
    type: "MESSAGE" as NotificationType,
    username: "hugo",
  },
  {
    id: 2,
    createdAt: new Date(),
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

export const mockedBooking: Booking = {
  id: 1,
  createdAt: new Date(),
  status: "PENDING",
  type: "PROPOSAL",
  requesterId: 1,
  ownerId: 2,
  distance: 1,
  bookId: 1,
};

export const mockedProposition: Proposition = {
  id: 1,
  createdAt: new Date(),
  status: "PENDING",
  proposedBookId: 1,
  receiverBookId: 2,
};

export const mockedBookPage: BookPageData = {
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
  booking: mockedBooking,
  proposed: null,
  propositionReceived: null,
};
