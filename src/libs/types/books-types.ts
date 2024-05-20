import { Booking } from "@prisma/client";

export type BookData = {
  id: number;
  title: string;
  author: string;
  image: string | null;
  description: string;
  user: string | null | undefined;
  userId: number;
  exchange: boolean;
  give: boolean;
  createdAt: Date;
  updatedAt: Date;
  likes: number[];
  postalCode: string;
  gpsCoordinates: number[];
  requested: boolean;
};

export type BookPageData = BookData & BookedBook & { booking: Booking | null };

export type BookedBook = Omit<BookData, "gpsCoordinates" | "postalCode"> & {
  distance: number;
  bookingId: number;
};
