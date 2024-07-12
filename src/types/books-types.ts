import type { Book, Booking, Proposition } from "@prisma/client";

export type BookData = {
  id: number;
  title: string;
  author: string;
  image: string | null;
  description: string;
  username: string | null | undefined;
  userId: number;
  exchange: boolean;
  give: boolean;
  createdAt: Date;
  updatedAt: Date;
  likes: number[];
  postalCode: string;
  gpsCoordinates: number[];
  requested: boolean;
  proposed?: boolean;
  propositionReceived?: boolean;
};

export type BookPageData = Omit<
  BookData,
  "proposed" | "propositionReceived"
> & {
  booking: Booking | null;
  proposed: Proposition | null;
  propositionReceived: Proposition | null;
};

export type BookedBook = Omit<
  BookData,
  "postalCode" | "gpsCoordinates" | "user"
> & {
  distance: number;
  bookingId: number;
  ownerId: number;
  username: string;
};

export type PropositionProposed = {
  booking: Booking | null;
  proposed: Proposition | null;
  propositionReceived: Proposition | null;
} & Book;

export type RequestedExchangeBook = {
  username: string | null;
  postalCode: string;
  gpsCoordinates: number[];
  requested: boolean;
  booking: Booking | null;
  proposed: Proposition | null;
  propositionReceived: Proposition | null;
} & Book;

export type PropositionGroup = {
  ownedBook: PropositionProposed;
  proposedInExchange: RequestedExchangeBook;
} | null;

export type Propositions = {
  booksExchangePropositionReceived: PropositionGroup[];
  booksAskedForExchange: PropositionGroup[];
};
